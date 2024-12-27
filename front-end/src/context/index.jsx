import React, { createContext, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateTimestamp = () => {
    return new Date()
      .toLocaleTimeString("ar-SA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace("ص", "صباحًا")
      .replace("م", "مساءً");
  };
  const handleSend = async (e) => {
    if (e) e.preventDefault();

    if (!query.trim()) return;

    const timestamp = generateTimestamp();

    setChatHistory((prev) => [
      ...prev,
      { query, response: null, timestamp: timestamp },
    ]);
    setQuery("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/chatbot", { query });
      const botTimestamp = generateTimestamp();
      setChatHistory((prev) =>
        prev.map((chat, index) =>
          index === prev.length - 1
            ? { ...chat, response: res.data.response, botTimestamp }
            : chat
        )
      );
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorTimestamp = generateTimestamp();
      setChatHistory((prev) =>
        prev.map((chat, index) =>
          index === prev.length - 1
            ? {
                ...chat,
                response:
                  "حدث خطأ أثناء معالجة استفسارك. الرجاء المحاولة مرة أخرى.",
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
    <GlobalContext.Provider
      value={{
        query,
        setQuery,
        loading,
        setLoading,
        chatHistory,
        setChatHistory,
        generateTimestamp,
        handleSend,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
