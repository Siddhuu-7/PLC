import React from 'react'
import { Clock, CheckCircle, Circle, ChevronLeft, ChevronRight, Flag } from 'lucide-react';
export default function Scorecard({testData,score,handelRetake}) {
        const percentage = Math.round((score / testData.test.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
                  <p className="text-gray-600">{testData.testName}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{score}/{testData.test.length}</div>
                  <div className="text-2xl font-semibold text-gray-700 mb-1">{percentage}%</div>
                  <p className="text-gray-600">Questions Answered Correctly</p>
                </div>
    
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{testData.test.length}</div>
                    <div className="text-sm text-gray-600">Total Questions</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-green-600">{score}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-red-600">{testData.test.length - score}</div>
                    <div className="text-sm text-gray-600">Incorrect</div>
                  </div>
                </div>
                
                <button
                  onClick={handelRetake}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          </div>
  )
}
