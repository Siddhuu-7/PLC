  import React, { useState } from 'react';
import { 
  ArrowLeft, Plus, Save, Trash2, Edit3, Code, 
  FileText, CheckCircle, Upload, Download, 
  Copy, Eye, Settings, Clock, Users
} from 'lucide-react';
  const MCQQuestion = ({ question, index, onUpdate, onDelete }) => {
    const updateQuestion = (field, value) => {
      const updated = { ...question, [field]: value };
      onUpdate(index, updated);
    };

    const updateOption = (optIndex, value) => {
      const updatedOptions = [...question.options];
      updatedOptions[optIndex] = value;
      updateQuestion('options', updatedOptions);
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Question {index + 1}</h4>
          <button
            onClick={() => onDelete(index)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
            <textarea
              value={question.question}
              onChange={(e) => updateQuestion('question', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Enter your question..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`correct-${index}`}
                  checked={question.correctAnswer === optIndex}
                  onChange={() => updateQuestion('correctAnswer', optIndex)}
                  className="text-blue-600"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(optIndex, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Option ${optIndex + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
              <input
                type="number"
                value={question.marks}
                onChange={(e) => updateQuestion('marks', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={question.difficulty}
                onChange={(e) => updateQuestion('difficulty', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default MCQQuestion