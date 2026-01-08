import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Circle, ChevronLeft, ChevronRight, Flag } from 'lucide-react';

// Question Component
const QuestionComponent = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect,
  isAnswered 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="flex items-center space-x-1">
          {isAnswered ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-300" />
          )}
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.option.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswer === option;
          
          return (
            <label
              key={index}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option}
                checked={isSelected}
                onChange={() => onAnswerSelect(option)}
                className="sr-only"
              />
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                isSelected
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="font-medium text-gray-700 mr-3 min-w-[20px]">
                {optionLetter}.
              </span>
              <span className="text-gray-900">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
export default QuestionComponent