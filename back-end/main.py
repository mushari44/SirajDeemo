from fastapi import FastAPI
from dotenv import load_dotenv
import os
import requests
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.llms.base import LLM
import numpy as np
from sentence_transformers import SentenceTransformer
from pydantic import BaseModel
from pymongo import MongoClient
app = FastAPI()
load_dotenv()
# CORS configuration

# MongoDB setup
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["blogs"]
collection = db["blog2"]

# Hugging Face Embedding Model
embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Preprocess and store embeddings
def preprocess_and_store_embeddings():
    for blog in collection.find({"embedding": {"$exists": False}}):
        embedding = embedding_model.encode(blog["content"]).tolist()
        collection.update_one(
            {"_id": blog["_id"]},
            {"$set": {"embedding": embedding}}
        )
preprocess_and_store_embeddings()  # Run this once to preprocess

# Vector similarity search
def fetch_blog_vector(query):
    query_embedding = embedding_model.encode(query)
    blogs = collection.find({"embedding": {"$exists": True}})
    similarities = []
    for blog in blogs:
        embedding = np.array(blog["embedding"])
        similarity = np.dot(query_embedding, embedding) / (
            np.linalg.norm(query_embedding) * np.linalg.norm(embedding)
        )
        similarities.append((similarity, blog))
    similarities.sort(reverse=True, key=lambda x: x[0])
    return [blog for _, blog in similarities[:5]]

# Retrieve documents
def retrieve_documents(user_query):
    blogs = fetch_blog_vector(user_query)
    if blogs:
        return [f"{blog['title']}: {blog['content']}" for blog in blogs]
    return ["No relevant blogs found."]

# Gemini API integration
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
GEMINI_API_KEY = "AIzaSyCEM7rI7XqC9UbJv6l9Il4Ntg61374SsXs"
# os.getenv("GEMINI_API_KEY")

def call_gemini_api(prompt):
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "temperature": 1,
            "maxOutputTokens": 300
        }
    }
    
    # Construct the full URL with the API key
    url_with_key = f"{GEMINI_API_URL}?key={GEMINI_API_KEY}"
    
    response = requests.post(url_with_key, headers=headers, json=payload)
    
    if response.status_code == 200:
        response_data = response.json()
        # Extract the generated content
        try:
            return response_data["candidates"][0]["content"]["parts"][0]["text"]
        except (KeyError, IndexError) as e:
            raise ValueError(f"Unexpected response structure: {response_data}") from e
    else:
        print("Error Response:", response.text)
        raise Exception(f"Error {response.status_code}: {response.text}")

# Custom Gemini LLM
class GeminiLLM(LLM):
    def _call(self, prompt: str, stop=None) -> str:
        return call_gemini_api(prompt)

    @property
    def _llm_type(self) -> str:
        return "gemini"

# LangChain components
llm = GeminiLLM()
prompt_template = PromptTemplate(
    input_variables=["context", "query"],
    template="""
    النص التالي مسترجع من مدونة: {context}
    السؤال: {query}
    الإجابة:
    """
)
# chain = LLMChain(llm=llm, prompt=prompt_template)
chain=prompt_template | llm
# Chatbot response
def chatbot_response(query):
    documents = retrieve_documents(query)
    context = " ".join(documents)
    try:
        response = chain.invoke({"context": context, "query": query})
    except Exception as e:
        response = f"An error occurred: {e}"
    return response



# Define the request body
class ChatRequest(BaseModel):
    query: str

@app.post("/chatbot")
async def chatbot_endpoint(request: ChatRequest):
    # Call your chatbot_response function here
    response = chatbot_response(request.query)
    return {"response": response}

