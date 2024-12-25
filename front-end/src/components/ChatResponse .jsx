import React from "react";

const ChatResponse = ({ query, response }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md mb-2">
      <p className="text-blue-500 font-semibold">Query:</p>
      <p>{query}</p>
      <p className="text-green-500 font-semibold mt-2">Response:</p>
      <p>{response}</p>
    </div>
  );
};

export default ChatResponse;
  