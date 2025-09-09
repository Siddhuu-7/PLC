import React from "react";
import { CheckCircle } from "lucide-react";

// Mock raw data (you can replace with API data later)


const Results = ({ testData, allQuestions, selectedAnswers ,marks,mockResults}) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Test Results
          </h2>
          <p className="text-gray-600">
            Below is the summary of participants for{" "}
            <span className="font-semibold">{testData.testName}</span>
          </p>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Status
                </th>
                
              </tr>
            </thead>
            <tbody>
              {mockResults.map((student) => (
                <tr
                  key={student.registerNumber}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3 border-b text-sm text-gray-800">
                    {student.registerNumber}
                  </td>
                  <td className="px-6 py-3 border-b text-sm text-gray-800">
                    {student.name}
                  </td>
                  <td className="px-6 py-3 border-b text-sm text-gray-800">
                    {student.score} / {testData.totalMarks}
                  </td>
                  <td className="px-6 py-3 border-b text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === "Passed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Test Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
            <div>
              <p className="font-medium">Test Marks</p>
              <p>{marks}</p>
            </div>
            <div>
              <p className="font-medium">Total Questions</p>
              <p>{allQuestions.length}</p>
            </div>
            <div>
              <p className="font-medium">Answered</p>
              <p>{Object.keys(selectedAnswers).length}</p>
            </div>
            <div>
              <p className="font-medium">Total Marks</p>
              <p>{testData.totalMarks}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
