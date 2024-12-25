import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BotResponse from "./BotResponse";
import WelcomeMessage from "./WelcomeMessage";
import SendIcon from "../assets/send.png";
import UserIcon from "../assets/user.png";
import EditIcon from "../assets/edit-text.svg";

const ChatCard = () => {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [welcomeTimestamp, setWelcomeTimestamp] = useState("");
  const chatContainerRef = useRef(null); // Ref for chat container

  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  useEffect(() => {
    preloadImage(UserIcon);
  }, []);

  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).replace("AM", "صباحًا").replace("PM", "مساءً");
    setWelcomeTimestamp(timestamp);
  }, []);

  useEffect(() => {
    // Scroll to bottom when chatHistory updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const userTimestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).replace("AM", "صباحًا").replace("PM", "مساءً");

    setChatHistory((prev) => [
      ...prev,
      { query, response: null, timestamp: userTimestamp },
    ]);
    setQuery("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/chatbot", {
        query: query,
      });

      const botTimestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).replace("AM", "صباحًا").replace("PM", "مساءً");

      setChatHistory((prev) =>
        prev.map((chat, index) =>
          index === prev.length - 1
            ? { ...chat, response: res.data.response, botTimestamp }
            : chat
        )
      );
    } catch (error) {
      console.error("Error fetching chatbot response:", error);

      const errorTimestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setChatHistory((prev) =>
        prev.map((chat, index) =>
          index === prev.length - 1
            ? {
                ...chat,
                response: "حدث خطأ أثناء معالجة استفسارك. الرجاء المحاولة مرة أخرى.",
                botTimestamp: errorTimestamp,
              }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6">
        <div
          ref={chatContainerRef} // Attach ref to the scrollable container
          className="border border-gray-300 rounded-md h-64 mt-4 p-4 overflow-y-auto"
        >
          <WelcomeMessage timestamp={welcomeTimestamp} />
          {chatHistory.length > 0
            ? chatHistory.map((chat, index) => (
                <div key={index}>
                  <div>
                    <div className="rounded-md mb-2 User-Chat">
                      <div className="Time-Icon">
                        <img src={UserIcon} alt="" />
                        <p className="text-sm">{`${chat.timestamp}`}</p>
                      </div>
                      <div>
                        <p className="User-Query">{chat.query}</p>
                      </div>
                    </div>
                  </div>
                  
                    <BotResponse
                      response={chat.response}
                      timestamp={chat.botTimestamp}
                    />
                  
                </div>
              ))
            : null}
        </div>
        <form onSubmit={handleSend} className="mt-4">
          <div className="flex items-center p-3 rounded-md border border-gray-300 focus-within:ring-gray-200 focus-within:ring-1">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none placeholder-gray-400"
              placeholder="سراج... لأن المعرفة تبدأ بسؤال"
              value={query}
              onChange={handleQueryChange}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="ml-2 text-blue-500 hover:text-blue-600 transition duration-300"
            >
              <img src={SendIcon} className="SendIcon" alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatCard;