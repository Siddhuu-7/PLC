import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save, BarChart3 } from 'lucide-react';
import { io } from 'socket.io-client';
export default function AdminPollCreator() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [currentPoll, setCurrentPoll] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
const socket = io(import.meta.env.VITE_BACKEND_URL); 
useEffect(()=>{

socket.on("getVoteResult", (data)=>{
setCurrentPoll(data)
});
  return () => {
socket.on("getVoteResult", (data)=>{
setCurrentPoll(data)
});  };
}, []);
  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createOptions = (optionsArray) => {
    return optionsArray.map((opt, idx) => ({
      id: idx + 1,
      text: opt,
      votes: 0,
      percentage: 0
    }));
  };

  const handleSavePoll = () => {
    if (question.trim() === '') {
      alert('Please enter a question');
      return;
    }

    const filledOptions = options.filter(opt => opt.trim() !== '');
    if (filledOptions.length < 2) {
      alert('Please add at least 2 options');
      return;
    }

    const optionsWithVotes = createOptions(filledOptions);
    const totalVotes = 0;

    const newPoll = {
      id: Date.now(),
      question: question,
      options: optionsWithVotes,
      totalVotes: totalVotes,
      createdAt: new Date().toLocaleString()
    };

    setCurrentPoll(newPoll);
    setQuestion('');
    setOptions(['', '']);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    socket.emit("vote",newPoll)
  };

  const deletePoll = () => {
    setCurrentPoll(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Create New Poll</h1>
            <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-semibold">
              Admin Panel
            </div>
          </div>

          {showSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
              Poll created successfully!
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Poll Question
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your poll question..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-gray-700 font-semibold">
                  Options
                </label>
                <button
                  onClick={addOption}
                  disabled={options.length >= 6}
                  className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add Option
                </button>
              </div>

              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium w-8">
                      {index + 1}.
                    </span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSavePoll}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg"
            >
              <Save className="w-5 h-5" />
              Create Poll
            </button>
          </div>
        </div>

        {currentPoll && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Current Poll Results
            </h2>
            <div className="space-y-6">
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {currentPoll.question}
                    </h3>
                    <div className="text-sm text-gray-500">
                      Created: {currentPoll.createdAt}
                    </div>
                  </div>
                  <button
                    onClick={deletePoll}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">
                      {currentPoll.totalVotes}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Total Votes
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentPoll.options.map((opt) => (
                    <div key={opt.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-700">{opt.text}</span>
                        <span className="text-lg font-bold text-indigo-600">{opt.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-end pr-3 transition-all duration-500"
                          style={{ width: `${opt.percentage}%` }}
                        >
                          <span className="text-white text-sm font-medium">{opt.votes} votes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}