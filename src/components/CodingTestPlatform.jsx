import React, { useState, useEffect, useRef } from "react";
import Header from "./TestHeader";
import Sidebar from "./TestSidebar";
import MCQQuestion from "./TestMCQQuestions";
import CodingQuestion from "./TestCodingQuestions";
import FullscreenCompiler from "./TestFullscreenCompiler";
import Results from "./TestResults";
import axios from "axios";
import { io } from 'socket.io-client';
const socket = io(import.meta.env.VITE_backend_Url); 
const CodingTestPlatform = ({ preview = false, testdata ,registerNumber}) => {
  const [testData, setTestData] = useState(testdata);
  const [loading, setLoading] = useState(!testdata);
const [codingAnswers, setCodingAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [language, setLanguage] = useState("java");
const [codes, setCodes] = useState({}); 
  const [testOutput, setTestOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [marks,setMarks]=useState(0)
  const textareaRef = useRef(null);
  const [mockResults,setMockResults]=useState([])
  useEffect(() => {
    if (!testData) return;
    setTimeLeft(testData.duration * 60);
    setAllQuestions([
      ...(testData.questions || []),
      ...(testData.programmingProblems || []),
    ]);
    setLoading(false);
  }, [testData]);

  useEffect(() => {
    if (!testData) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [testData]);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
const runCode = async () => {
  const current = codes[currentQuestion];
  console.log("runned",current)
  if (!current) return;

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/questions/run`,
      {
        code: current.code,
        language: current.language,
      }
    );
    setTestOutput(res.data.output);  
   
  } catch (err) {
    setTestOutput("❌ Error running code");
  }
};
const submitCode = async (qmarks) => {
  const current = codes[currentQuestion];
    console.log("runned",current)

  if (!current) return;

  const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/questions/submit`,{
      code: current.code,
      language: current.language,
      questionId: currentQ.id, 
    })

  const data = res.data
  
  if (data.passedAll) {
    setMarks(marks+qmarks)
    alert("All test cases passed! Marks awarded.");
  } else {
    alert("Some test cases failed.");
  }
};
useEffect(() => {
  const handler = (payload) => {
    console.log(payload)
    const newUser = {
      registerNumber: payload.registerNumber,
      name: payload.name,
      score: payload.totalScore,
      status: payload.status,
    };

    setMockResults(prev => {
      const index = prev.findIndex(u => u.registerNumber === newUser.registerNumber);
      if (index > -1) {
        const updated = [...prev];
        updated[index] = newUser;
        return updated;
      } else {
        return [...prev, newUser];
      }
    });

  };

  socket.on("getresult", handler);

  return () => {
    socket.off("getresult", handler);
  };
}, []);



  const handleSubmitTest = async () => {
  try {
    setLoading(true);

    const payload = {
      testId: testData._id || testData.testId,
      registerNumber,
      answers: selectedAnswers,
      submittedAt: new Date(),
      timeTaken: testData.duration * 60 - timeLeft,
    };

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/questions/results`, payload);
    const resScore = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/questions/getscore?testId=${payload.testId}`);

    setMockResults(resScore.data);

    if (res.data) {
      console.log(res.data.result.totalScore);

      let qmarks = res.data.result.totalScore;
      setMarks(prev => prev + qmarks);  
      
      socket.emit("sendresult", {payload:res.data.result});
      setShowResults(true);
    }

    setLoading(false);
  } catch (error) {
    console.error("Submit failed", error);
    setLoading(false);  
  }
};
;


  if (loading) {
    return <div className="p-6 text-center">⏳ Loading test...</div>;
  }

  if (showResults) {
    return (
      <Results
        testData={testData}
        allQuestions={allQuestions}
        selectedAnswers={selectedAnswers}
        marks={marks}
        mockResults={mockResults}
      />
    );
  }

  const currentQ = allQuestions[currentQuestion] || {};

  return (
    <div className="min-h-screen bg-gray-100">
      {isFullscreen && currentQ.type === "coding" ? (
        <FullscreenCompiler
          currentQ={currentQ}
          codes={codes}
          setCodes={setCodes}
          language={language}
          setLanguage={setLanguage}
          testOutput={testOutput}
          runCode={runCode}
          submitCode={submitCode}
          isRunning={isRunning}
          toggleFullscreen={() => setIsFullscreen(false)}
          timeLeft={timeLeft}
          formatTime={formatTime}
          currentQuestion={currentQuestion}
          setCodingAnswers={setCodingAnswers}
        />
      ) : (
        <>
          <Header
            testData={testData}
            timeLeft={timeLeft}
            formatTime={formatTime}
            handleSubmitTest={handleSubmitTest}
          />

          <div className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
            <Sidebar
              allQuestions={allQuestions}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              selectedAnswers={selectedAnswers}
              testData={testData}
            />

            <div className="col-span-9 bg-white rounded-lg shadow-sm">
              {currentQ.type === "mcq" ? (
                <MCQQuestion
                  currentQ={currentQ}
                  currentQuestion={currentQuestion}
                  selectedAnswers={selectedAnswers}
                  setSelectedAnswers={setSelectedAnswers}
                  total={allQuestions.length}
                  setCurrentQuestion={setCurrentQuestion}
                />
              ) : (
                <CodingQuestion
                  currentQ={currentQ}
                  codes={codes}
                  setCodes={setCodes}
                  language={language}
                  setLanguage={setLanguage}
                  testOutput={testOutput}
                  runCode={runCode}
                  submitCode={submitCode}
                  isRunning={isRunning}
                  toggleFullscreen={() => setIsFullscreen(true)}
                  textareaRef={textareaRef}
                  currentQuestion={currentQuestion}
                  total={allQuestions.length}
                  setCurrentQuestion={setCurrentQuestion}
                   setCodingAnswers={setCodingAnswers}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CodingTestPlatform;
