import React, { useState, useEffect } from "react";
import { io } from 'socket.io-client';

export default function PollCard() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [currentPoll, setCurrentPoll] = useState(null);
  const socket = io(import.meta.env.VITE_backend_Url);

  useEffect(() => {
    socket.on("getVoteResult", (data) => {
      setCurrentPoll(data);
    });

    return () => {
      socket.off("getVoteResult");
    };
  }, []);

  const handleVote = (optionId) => {
    if (hasVoted || !currentPoll) return;
    
    setSelectedOption(optionId);
    setHasVoted(true);
    
    
    socket.emit("studentVote", {
  optionId: optionId
});

  };

  if (!currentPoll) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-6 font-serif italic text-gray-800">
          📊 Quick Poll
        </h3>
        <p className="text-gray-500 py-8">No active poll at the moment</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
      <h3 className="text-xl font-bold mb-6 font-serif italic text-gray-800">
        📊 Quick Poll
      </h3>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 shadow">
        <p className="text-lg font-semibold text-gray-900 mb-6">
          {currentPoll.question}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {currentPoll.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                hasVoted && selectedOption === option.id
                  ? index === 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  : hasVoted
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : index === 0 
                    ? "bg-green-400 text-white hover:bg-green-500" 
                    : "bg-red-400 text-white hover:bg-red-500"
              }`}
            >
              {index === 0 ? "✓" : "✗"} {option.text}
            </button>
          ))}
        </div>

        {hasVoted && (
          <p className="mt-4 text-sm text-gray-600 italic">
            Thank you for your feedback!
          </p>
        )}
      </div>
    </div>
  );
}