import React, { useState } from "react";
import axios from "axios";
import BotResponse from "./BotResponse";

const ChatCard = () => {
  const welcomingText =
    "مرحبًا بك! 👋 كيف يمكنني مساعدتك اليوم؟ يمكنك الاستفسار حول أي جزء من محتوى المدونة";
  const suggestQ = "ما هي المواضيع الأكثر شيوعًا في هذه المدونة؟";

  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    
   
    setChatHistory((prev) => [...prev, { query, response: null }]);
    setQuery(""); 
    setLoading(true);
  
    try {
      
      const res = await axios.post("http://127.0.0.1:5000/chatbot", {
        query: query,
      });
  
      
      setChatHistory((prev) =>
        prev.map((chat, index) =>
          index === prev.length - 1
            ? { ...chat, response: res.data.response }
            : chat
        )
      );
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
  
     
      setChatHistory((prev) =>
        prev.map((chat, index) =>
          index === prev.length - 1
            ? { ...chat, response: "حدث خطأ أثناء معالجة استفسارك. الرجاء المحاولة مرة أخرى." }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Main Card */}
      <div className="bg-white shadow-lg rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6">
        {/* Header Section */}
        <div className="bg-blue-600 text-white rounded-md p-4 shadow">
          <h1 className="text-xl font-bold">{welcomingText}</h1>
          <p className="text-sm mt-2 opacity-90">{suggestQ}</p>
        </div>

        {/* Chat History Section */}
        
        <div className="bg-gray-50 border border-gray-300 rounded-md h-64 mt-4 p-4 overflow-y-auto">
          {chatHistory.length > 0 ? (
            chatHistory.map((chat, index) => (
              <div key={index}>
                {/* User Query */}
                <div className="bg-gray-100 p-4 rounded-md mb-2">
                  <p className="text-blue-500 font-semibold">Query:</p>
                  <p>{chat.query}</p>
                </div>

                {/* Bot Response (if available) */}
                {chat.response && <BotResponse response={chat.response} />}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-6">لا توجد محادثات حتى الآن.</p>
          )}
        </div>


        {/* Input and Send Button Section */}
        <form onSubmit={handleSend} className="mt-4">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              className="flex-1 bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="اكتب استفسارك هنا..."
              value={query}
              onChange={handleQueryChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white font-medium px-4 py-3 rounded-md hover:bg-blue-600 transition duration-300 w-full md:w-auto"
              disabled={loading}
            >
              {loading ? "جارٍ الإرسال..." : "إرسال"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatCard;
