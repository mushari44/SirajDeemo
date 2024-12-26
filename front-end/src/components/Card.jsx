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
          className="border border-gray-300 rounded-md h-64 mt-4 p-4 overflow-y-auto Chat-Container"
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
                        <button
                        aria-label="Edit message"
                        className="Edit-Button"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon-md"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>
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