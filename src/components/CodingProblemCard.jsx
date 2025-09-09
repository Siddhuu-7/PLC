  import React, { useState } from 'react';
import { 
  ArrowLeft, Plus, Save, Trash2, Edit3, Code, 
  FileText, CheckCircle, Upload, Download, 
  Copy, Eye, Settings, Clock, Users
} from 'lucide-react';
  const CodingProblem = ({ problem, index, onUpdate, onDelete }) => {
    const updateProblem = (field, value) => {
      const updated = { ...problem, [field]: value };
      onUpdate(index, updated);
    };

    const updateTestCase = (tcIndex, field, value) => {
      const updatedTestCases = [...problem.testCases];
      updatedTestCases[tcIndex] = { ...updatedTestCases[tcIndex], [field]: value };
      updateProblem('testCases', updatedTestCases);
    };

    const addTestCase = () => {
      const newTestCase = { input: '', output: '', isHidden: false };
      updateProblem('testCases', [...problem.testCases, newTestCase]);
    };

    const removeTestCase = (tcIndex) => {
      const updatedTestCases = problem.testCases.filter((_, i) => i !== tcIndex);
      updateProblem('testCases', updatedTestCases);
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Coding Problem {index + 1}</h4>
          <button
            onClick={() => onDelete(index)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Problem Title</label>
            <input
              type="text"
              value={problem.title}
              onChange={(e) => updateProblem('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter problem title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Problem Description</label>
            <textarea
              value={problem.description}
              onChange={(e) => updateProblem('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="6"
              placeholder="Describe the problem statement, input format, output format, constraints, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit (ms)</label>
              <input
                type="number"
                value={problem.timeLimit}
                onChange={(e) => updateProblem('timeLimit', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="5000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Memory Limit (MB)</label>
              <input
                type="number"
                value={problem.memoryLimit}
                onChange={(e) => updateProblem('memoryLimit', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="256"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
              <input
                type="number"
                value={problem.marks}
                onChange={(e) => updateProblem('marks', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="20"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Test Cases</label>
              <button
                onClick={addTestCase}
                className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Test Case
              </button>
            </div>

            <div className="space-y-4">
              {problem.testCases.map((testCase, tcIndex) => (
                <div key={tcIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Test Case {tcIndex + 1}</h5>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={testCase.isHidden}
                          onChange={(e) => updateTestCase(tcIndex, 'isHidden', e.target.checked)}
                          className="mr-1"
                        />
                        Hidden
                      </label>
                      <button
                        onClick={() => removeTestCase(tcIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
                      <textarea
                        value={testCase.input}
                        onChange={(e) => updateTestCase(tcIndex, 'input', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        placeholder="Enter input for this test case"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expected Output</label>
                      <textarea
                        value={testCase.output}
                        onChange={(e) => updateTestCase(tcIndex, 'output', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        placeholder="Enter expected output"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default CodingProblem