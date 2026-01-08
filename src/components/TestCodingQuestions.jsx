import React from "react";
import { Code, FileText, Play, Send, Maximize2 } from "lucide-react";

const CodingQuestion = ({
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
  textareaRef,
  currentQuestion,
  total,
  setCurrentQuestion,
}) => {
  return (
    <div className="h-full">
      {/* Problem Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            Programming Problem {currentQuestion + 1}
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            {currentQ.marks} marks
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {currentQ.title}
        </h2>
        <p className="text-gray-600">{currentQ.description}</p>

        <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
          <span>Time Limit: {currentQ.timeLimit}ms</span>
          <span>Memory Limit: {currentQ.memoryLimit}MB</span>
        </div>
      </div>

      {/* Editor + Output */}
      <div className="grid grid-cols-2 h-[calc(100vh-300px)]">
        {/* Code Editor */}
        <div className="border-r">
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center gap-3">
              <Code className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-800">Code Editor</span>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={language}
                  onChange={(e) =>
                      setCodingAnswers({
                        ...codingAnswers,
                        [currentQuestion]: {
                          ...(codingAnswers[currentQuestion] || {}),
                          language: e.target.value,
                        },
                      })
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
                title="Enter Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-4 h-full flex flex-col">
            <textarea
  ref={textareaRef}
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
  className="w-full flex-1 font-mono text-sm border border-gray-200 rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Write your code here..."
/>

            
            <div className="flex gap-3 mt-4">
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
          </div>
        </div>

        {/* Output */}
        <div>
          <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
            <FileText className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-800">Output</span>
          </div>
          <div className="p-4 h-full">
            <div className="bg-gray-900 text-green-400 font-mono text-sm rounded-md p-4 h-5/6 overflow-auto whitespace-pre-wrap">
              {testOutput || 'Click "Run Code" to see the output...'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-6 border-t bg-gray-50">
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

export default CodingQuestion;
