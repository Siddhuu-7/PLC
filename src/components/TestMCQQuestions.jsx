import React from "react";

const MCQQuestion = ({
  currentQ,
  currentQuestion,
  selectedAnswers,
  setSelectedAnswers,
  total,
  setCurrentQuestion,
}) => {
  const handleSelect = (answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }));
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Question {currentQuestion + 1}
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            {currentQ.marks} marks
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
            {currentQ.difficulty}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQ.question}
        </h2>
      </div>

      <div className="space-y-3">
        {currentQ.options.map((option, index) => (
          <label
            key={index}
            className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedAnswers[currentQuestion] === index
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={selectedAnswers[currentQuestion] === index}
                onChange={() => handleSelect(index)}
                className="text-blue-600"
              />
              <span className="text-gray-800">{option}</span>
            </div>
          </label>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 border-t pt-4">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          {currentQuestion + 1} of {total}
        </span>
        <button
          onClick={() =>
            setCurrentQuestion(Math.min(total - 1, currentQuestion + 1))
          }
          disabled={currentQuestion === total - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MCQQuestion;
