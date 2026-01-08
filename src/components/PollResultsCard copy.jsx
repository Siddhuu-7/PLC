import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function PollResultsCard() {
  const [selectedOption, setSelectedOption] = useState(null);
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

  if (!currentPoll) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 font-serif italic">Poll Results</h3>
        <p className="text-gray-500 text-center py-8">No active poll at the moment</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 font-serif italic">Poll Results</h3>
      
      <div className="mb-6">
        <p className="text-gray-700 font-medium mb-4">{currentPoll.question}</p>
        
        <div className="space-y-4">
          {currentPoll.options.map((option, index) => (
            <div 
              key={option.id}
              className="relative cursor-pointer"
              onClick={() => setSelectedOption(option.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">{option.text}</span>
                <span className="text-lg font-bold text-blue-600">
                  {currentPoll.totalVotes > 0 ? option.percentage : 0}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3 ${
                    index === 0 ? 'bg-green-500' : 'bg-red-500'
                  } ${selectedOption === option.id ? 'opacity-100' : 'opacity-90'}`}
                  style={{ width: `${currentPoll.totalVotes > 0 ? option.percentage : 0}%` }}
                >
                  {option.votes > 0 && (
                    <span className="text-white text-sm font-medium">{option.votes} votes</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-gray-500 text-sm mt-4 text-center">
          Total votes: {currentPoll.totalVotes}
        </p>
        
        <p className="text-gray-400 text-xs mt-2 text-center">
          Created: {currentPoll.createdAt}
        </p>
      </div>
    </div>
  );
}