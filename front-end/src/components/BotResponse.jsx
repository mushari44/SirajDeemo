import React, { useState } from "react";
import sirajIcon from "../assets/Siraj-icon.png";
import copyIcon from "../assets/copy.svg";
import checkIcon from "../assets/check.svg"; // New checkmark icon
import likeIcon from "../assets/like.svg";
import disLikeIcon from "../assets/dislike.svg";
import Loader from "./Loader.jsx";

const BotResponse = ({ response, timestamp }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(response)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return response ? (
    <div className="Bot-Response">
      <div className="Time-Icon">
        <img src={sirajIcon} alt="Siraj icon" />
        <div>
          <h2 className="text-lg">سِراج</h2>
          <p className="text-sm">{timestamp}</p>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-2 Response-Container">
        <p className="Response text-lg">{response}</p>
      </div>

      <div className="flex space-x-2 items-center">
        {/* Copy Button */}
        <button
          className="rounded-lg text-token-text-secondary hover:bg-token-main-surface-secondary"
          aria-label="Copy"
          onClick={handleCopy}
        >
          <span className="flex items-center justify-center h-[30px] w-[30px]">
            <img
              src={copied ? checkIcon : copyIcon} // Toggle icons
              alt={copied ? "Check Icon" : "Copy Icon"}
            />
          </span>
        </button>

        {/* Like Button */}
        <button
          className="rounded-lg text-token-text-secondary hover:bg-token-main-surface-secondary"
          aria-label="Like"
        >
          <span className="flex items-center justify-center h-[30px] w-[30px]">
            <img src={likeIcon} alt="Like Icon" />
          </span>
        </button>

        {/* Dislike Button */}
        <button
          className="rounded-lg text-token-text-secondary hover:bg-token-main-surface-secondary"
          aria-label="Dislike"
        >
          <span className="flex items-center justify-center h-[30px] w-[30px]">
            <img src={disLikeIcon} alt="Dislike Icon" />
          </span>
        </button>
      </div>
    </div>
  ) : (
    <div className="loader">
      <div className="bg-blue-600 text-white rounded-md p-4">
        <Loader />
      </div>
    </div>
  );
};

export default BotResponse;
