
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Circle, ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import QuestionComponent from '../components/MCQSquestionCard';
import Scorecard from '../components/Scorecard';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
const TestsComponent = () => {
  const [searchParams] = useSearchParams();
  const testId = searchParams.get("testId");
  const [testData,setData]=useState({})
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    async function FetchTest() {
        try {
            const res=await axios.get(`${import.meta.env.VITE_backend_Url}/api/questions/test/?testId=${testId}`)
            
                setData(res.data.data)
                setLoading(false)
            
        } catch (error) {
            console.log(error)
        }
    }
    FetchTest()
  },[])
//   const testData = {
//     "testId": 3,
//     "testName": "java quiz",
//     "testSubject": "social",
//     "test": [
//       {
//         "question": "What is the capital of Japan?",
//         "option": [
//           "Seoul",
//           "Tokyo",
//           "Beijing",
//           "Bangkok"
//         ],
//         "answer": "Tokyo",
//         "_id": "68b452ba74f4d9099bc65196"
//       },
//       {
//         "question": "What is the square root of 81?",
//         "option": [
//           "7",
//           "8",
//           "9",
//           "10"
//         ],
//         "answer": "9",
//         "_id": "68b452ba74f4d9099bc65197"
//       },
//       {
//         "question": "Which company developed the Windows operating system?",
//         "option": [
//           "Apple",
//           "Google",
//           "Microsoft",
//           "IBM"
//         ],
//         "answer": "Microsoft",
//         "_id": "68b452ba74f4d9099bc65198"
//       },
//       {
//         "question": "Which gas do humans need to breathe to survive?",
//         "option": [
//           "Oxygen",
//           "Carbon Dioxide",
//           "Nitrogen",
//           "Helium"
//         ],
//         "answer": "Oxygen",
//         "_id": "68b452ba74f4d9099bc65199"
//       },
//       {
//         "question": "Who wrote Romeo and Juliet?",
//         "option": [
//           "Charles Dickens",
//           "William Shakespeare",
//           "Mark Twain",
//           "Jane Austen"
//         ],
//         "answer": "William Shakespeare",
//         "_id": "68b452ba74f4d9099bc6519a"
//       }
//     ],
//     "questions": 5,
//     "_id": "68b452ba74f4d9099bc65195",
//     "__v": 0
//   };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer) => {
    const currentQuestion = testData.test[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion._id]: answer
    }));
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < testData.test.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);
  };
  const handelRetake=()=>{
                setShowResults(false);
                setIsSubmitted(false);
                setAnswers({});
                setCurrentQuestionIndex(0);
                setTimeLeft(1800);
  }
  const calculateScore = () => {
    let correct = 0;
    testData.test.forEach(question => {
      if (answers[question._id] === question.answer) {
        correct++;
      }
    });
    return correct;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

if (!testData.test || testData.test.length === 0) {
  return <div className="p-6 text-center text-gray-600">No questions found.</div>;
}
  if (showResults) {
    const score = calculateScore();
    
    return (
        <Scorecard testData={testData} score={score} handelRetake={handelRetake}/>
    );
  }

  const currentQuestion = testData.test[currentQuestionIndex];
  const answeredCount = getAnsweredCount();

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{testData.testName}</h1>
            <p className="text-sm text-gray-600 capitalize">{testData.testSubject}</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Flag className="w-4 h-4" />
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Questions</h3>
              <div className="text-sm text-gray-600 mb-4">
                {answeredCount} of {testData.test.length} answered
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {testData.test.map((_, index) => {
                  const isAnswered = answers[testData.test[index]._id];
                  const isCurrent = index === currentQuestionIndex;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                        isCurrent
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : isAnswered
                          ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((answeredCount / testData.test.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(answeredCount / testData.test.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Question Area */}
          <div className="col-span-9">
            <QuestionComponent
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={testData.test.length}
              selectedAnswer={answers[currentQuestion._id]}
              onAnswerSelect={handleAnswerSelect}
              isAnswered={!!answers[currentQuestion._id]}
            />

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentQuestionIndex === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {testData.test.length}
                </span>
              </div>

              <button
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === testData.test.length - 1}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentQuestionIndex === testData.test.length - 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-white bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Submit Warning */}
            {answeredCount < testData.test.length && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> You have {testData.test.length - answeredCount} unanswered questions. 
                  Make sure to answer all questions before submitting.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsComponent;