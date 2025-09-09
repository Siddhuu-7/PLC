import React from "react";

const Sidebar = ({
  allQuestions,
  currentQuestion,
  setCurrentQuestion,
  selectedAnswers,
  testData,
}) => {
  const getStatus = (index) =>
    selectedAnswers[index] !== undefined ? "answered" : "unanswered";

  return (
    <div className="col-span-3 bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Questions</h3>
      <div className="grid grid-cols-4 gap-2 mb-6">
        {allQuestions.map((_, index) => {
          const status = getStatus(index);
          return (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                currentQuestion === index
                  ? "bg-blue-600 text-white"
                  : status === "answered"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
          <span className="text-gray-600">
            Answered ({Object.keys(selectedAnswers).length})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200"></div>
          <span className="text-gray-600">
            Not Answered ({allQuestions.length - Object.keys(selectedAnswers).length})
          </span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t">
        <h4 className="font-medium text-gray-800 mb-3">Instructions</h4>
        <p className="text-sm text-gray-600">{testData.instructions}</p>
      </div>
    </div>
  );
};

export default Sidebar;
