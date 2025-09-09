import React from "react";
import { Clock } from "lucide-react";

const Header = ({ testData, timeLeft, formatTime, handleSubmitTest }) => (
  <div className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{testData.testName}</h1>
        <p className="text-gray-600">
          {testData.testSubject} • {testData.totalMarks} marks
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-orange-600">
          <Clock className="w-5 h-5" />
          <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
        </div>
        <button
          onClick={handleSubmitTest}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit Test
        </button>
      </div>
    </div>
  </div>
);

export default Header;
