import React from "react";
import { Clock, Code, Play, Send, Minimize2 } from "lucide-react";

const FullscreenCompiler = ({
  currentQ,
  codes,
  setCodes,
  language,
  setLanguage,
  testOutput,
  runCode,
  submitCode,
  isRunning,
  toggleFullscreen,
  timeLeft,
  formatTime,
 currentQuestion,
  setCodingAnswers

}) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center gap-4">
          <Code className="w-5 h-5 text-gray-600" />
          <h2 className="font-semibold text-gray-800">{currentQ.title}</h2>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            {currentQ.marks} marks
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-orange-600">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
          <select
            value={language}
             onChange={(e) =>
                      setLanguage(e.target.value)
                    }   
            className="px-3 py-1 border border-gray-200 rounded-md text-sm"
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-md text-sm hover:bg-gray-100"
          >
            <Minimize2 className="w-4 h-4" />
            Exit Fullscreen
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 grid grid-cols-2">
        {/* Problem */}
        <div className="border-r bg-gray-50 overflow-auto p-6">
          <h3 className="text-lg font-semibold mb-4">Problem Description</h3>
          <p className="text-gray-700 mb-6">{currentQ.description}</p>
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Constraints</h4>
            <div className="bg-white rounded-lg p-4 text-sm">
              <p>Time Limit: {currentQ.timeLimit}ms</p>
              <p>Memory Limit: {currentQ.memoryLimit}MB</p>
            </div>
          </div>
          <h4 className="font-semibold mb-3">Sample Test Cases</h4>
          {currentQ.testCases.map((tc, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 mb-3">
              <p className="font-medium text-gray-600 mb-1">Input:</p>
              <code className="bg-gray-100 p-2 rounded block">{tc.input}</code>
              <p className="font-medium text-gray-600 mt-2 mb-1">Output:</p>
              <code className="bg-gray-100 p-2 rounded block">{tc.output}</code>
            </div>
          ))}
        </div>

        {/* Editor + Output */}
        <div className="flex flex-col">
          <div className="flex-1 p-4">
            <textarea
              value={codes[currentQuestion]?.code || ""}
  onChange={(e) =>
    setCodes({
      ...codes,
      [currentQuestion]: {
        ...(codes[currentQuestion] || { language: "python" }),
        code: e.target.value,
      },
    })
  }
              className="w-full h-full font-mono text-sm border border-gray-200 rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your code here..."
            />
          </div>
          <div className="border-t p-4">
            <div className="flex gap-3 mb-4">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                {isRunning ? "Running..." : "Run Code"}
              </button>
              <button
                onClick={()=>submitCode(currentQ.marks)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
                Submit
              </button>
            </div>
            <div className="bg-gray-900 text-green-400 font-mono text-sm rounded-md p-4 h-48 overflow-auto whitespace-pre-wrap">
              {testOutput || 'Click "Run Code" to see the output...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenCompiler;
