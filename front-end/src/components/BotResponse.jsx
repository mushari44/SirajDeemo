import React, { useState } from "react";
import sirajIcon from "../assets/Siraj-icon.png";
import copyIcon from "../assets/copy.svg";
import checkIcon from "../assets/check.svg";
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

  // Function to format response
  const formatResponse = (text) => {
    console.log(text);

    // Match numbers followed by headers or normal text
    const regex = /(\d+\.\s*\*\*.*?\*\*)(.*?)(?=\d+\.\s*\*\*|$)/gs;
    const matches = [...text.matchAll(regex)];
    console.log("Matches: ", matches);

    return matches.map((match, index) => {
      const header = match[1].replace(/\*\*/g, ""); // Remove `**` from header
      const description = match[2].trim(); // Get the description text

      return (
        <div key={index} style={{ textAlign: "right", direction: "rtl" }}>
          <h3 className="font-bold text-lg text-blue-600 my-2">{header}</h3>
          <p className="text-gray-800 text-md mb-1">{description}</p>
        </div>
      );
    });
  };

  return response ? (
    <div className="Bot-Response">
      <div
        className="Time-Icon"
        style={{ textAlign: "right", direction: "rtl" }}
      >
        <img src={sirajIcon} alt="Siraj icon" />
        <div>
          <h2 className="text-lg">سِراج</h2>
          <p className="text-sm">{timestamp}</p>
        </div>
      </div>
      <div
        className="bg-gray-100 p-4 rounded-md mb-2 Response-Container"
        style={{ textAlign: "right", direction: "rtl" }}
      >
        {formatResponse(response).length === 0
          ? response
          : formatResponse(response)}
      </div>

      <div
        className="flex space-x-2 items-center"
        style={{ justifyContent: "flex-end", direction: "rtl" }}
      >
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
