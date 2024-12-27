import React, { useContext } from "react";
import sirajIcon from "../assets/Siraj-icon.png";
import { GlobalContext } from "../context";

const WelcomeMessage = ({ timestamp }) => {
  const { setQuery } = useContext(GlobalContext);

  const welcomingText = [
    "👋 مرحباً بك في سراج!",
    "كيف يمكنني مساعدتك؟",
    "يمكنك الاستفسار حول أي جزء من محتوى المدونة",
  ];

  const suggestions = [
    "ما هي مواضيع المدونة؟",
    "كيف أستخدم المنصة؟",
    "أين يمكنني العثور على أحدث المقالات؟",
  ];

  return (
    <div className="Message-Suggests">
      {/* Icon and Timestamp */}
      <div className="Time-Icon">
        <img src={sirajIcon} alt="Siraj icon" />
        <div>
          <h2>سِراج</h2>
          <p className="text-sm">{timestamp}</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-blue-600 text-white rounded-md p-4 Welcome-Message">
        {welcomingText.map((line, index) => (
          <p className="text-xl" key={index}>
            {line}
          </p>
        ))}
      </div>

      {/* Suggested Questions */}
      <div className="SuggestQ">
        {suggestions.map((suggestion, index) => (
          <p
            key={index}
            className="bg-blue-600 text-white rounded-md p-4 suggest"
            onClick={() => setQuery(suggestion)}
          >
            {suggestion}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WelcomeMessage;
