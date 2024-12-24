// Card.jsx
import React from "react";

const Card = () => {
  const welcomingText =
    "مرحبًا بك! 👋 كيف يمكنني مساعدتك اليوم؟ يمكنك الاستفسار حول أي جزء من محتوى المدونة";
  const suggestQ = "ما هي المواضيع الأكثر شيوعًا في هذه المدونة؟";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-4 rounded-md w-1/2 flex flex-col items-center">
        <div className="bg-slate-700 h-24 w-full rounded-t-md flex items-center justify-center p-4 text-white">
          <div>
            <p className="text-lg font-bold">{welcomingText}</p>
            <p className="text-sm mt-2">{suggestQ}</p>
          </div>
        </div>
        <div className="bg-black h-12 w-full mt-2"></div>
        <input
          className="bg-gray-500 mt-4 p-2 rounded-md w-full"
          placeholder="Type something..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
          SEND
        </button>
      </div>
    </div>
  );
};

export default Card;
