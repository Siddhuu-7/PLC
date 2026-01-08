import React, { useState } from 'react';
import { 
  ArrowLeft, Plus, Save, Trash2, Edit3, Code, 
  FileText, CheckCircle, Upload, Download, 
  Copy, Eye, Settings, Clock, Users
} from 'lucide-react';
import MCQQuestion from './McqsUploadCard';
import CodingProblem from './CodingProblemCard';
import axios from 'axios';
import UrlCard from './Urlsend';
const TestCreationDashboard = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [testData, setTestData] = useState({
    testId: Date.now(),
    testName: '',
    testSubject: '',
    duration: 60,
    totalMarks: 100,
    instructions: '',
    allowedAttempts: 1,
    randomizeQuestions: false
  });
  const [questions, setQuestions] = useState([]);
  const [programmingProblems, setProgrammingProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [ispublic,setispublic]=useState(false)
  const [time,setTime]=useState("")
  const [date,setDate]=useState("")
  const [Url,setUrl]=useState("")
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };


 
  const addMCQQuestion = () => {
    const newQuestion = {
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      marks: 2,
      difficulty: 'medium'
    };
    setQuestions([...questions, newQuestion]);
  };

  const addCodingProblem = () => {
    const newProblem = {
      type: 'coding',
      title: '',
      description: '',
      timeLimit: 5000,
      memoryLimit: 256,
      marks: 20,
      testCases: [{ input: '', output: '', isHidden: false }]
    };
    setProgrammingProblems([...programmingProblems, newProblem]);
  };

  const updateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const updateProgrammingProblem = (index, updatedProblem) => {
    const updatedProblems = [...programmingProblems];
    updatedProblems[index] = updatedProblem;
    setProgrammingProblems(updatedProblems);
  };

  const deleteProgrammingProblem = (index) => {
    const updatedProblems = programmingProblems.filter((_, i) => i !== index);
    setProgrammingProblems(updatedProblems);
  };

  const handleSaveTest = async () => {
    setIsLoading(true);
    try {
      const testPayload = {
        ...testData,
        questions,
        programmingProblems,
        totalQuestions: questions.length + programmingProblems.length,
        ispublic
      };
      const testStartTime=!ispublic?date+';'+time:""
const res = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/api/questions?testStartTime=${testStartTime}`,
  testPayload
);
      if(res.data){
         showNotification('Test created successfully!', 'success');
         if(res.data.url){
          console.log(res.data.url)
          setUrl(res.data.url)
         }
      }else{
        showNotification('Error creating test', 'error');
      }
      


    } catch (error) {
      showNotification('Error creating test', 'error');
    }
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Go back"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create Test</h1>
                <p className="text-gray-600 mt-1">Design comprehensive assessments with multiple question types</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button 
                onClick={handleSaveTest}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {isLoading ? (
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Test
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'basic', label: 'Basic Info', icon: FileText },
                { id: 'questions', label: 'Questions', icon: CheckCircle },
                { id: 'coding', label: 'Coding Problems', icon: Code },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Test Name *</label>
                    <input
                      type="text"
                      value={testData.testName}
                      onChange={(e) => setTestData({...testData, testName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter test name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Test ID *</label>
                    <input
                      type="text"
                      value={testData.testId}
                      onChange={(e) => setTestData({...testData, testId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter unique test ID"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select
                      value={testData.testSubject}
                      onChange={(e) => setTestData({...testData, testSubject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select subject</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="programming">Programming</option>
                      <option value="science">Science</option>
                      <option value="english">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                    <input
                      type="number"
                      value={testData.duration}
                      onChange={(e) => setTestData({...testData, duration: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                    <input
                      type="number"
                      value={testData.totalMarks}
                      onChange={(e) => setTestData({...testData, totalMarks: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                  <textarea
                    value={testData.instructions}
                    onChange={(e) => setTestData({...testData, instructions: e.target.value})}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter test instructions for students..."
                  />
                </div>
              </div>
            )}

            
            {activeTab === 'questions' && (
              <div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Multiple Choice Questions</h3>
                    <button
                      onClick={addMCQQuestion}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add MCQ
                    </button>
                  </div>

                  {questions.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No questions added yet</p>
                      <button
                        onClick={addMCQQuestion}
                        className="mt-4 text-blue-600 hover:text-blue-700"
                      >
                        Add your first question
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <MCQQuestion
                          key={index}
                          question={question}
                          index={index}
                          onUpdate={updateQuestion}
                          onDelete={deleteQuestion}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            
            {activeTab === 'coding' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Programming Problems</h3>
                  <button
                    onClick={addCodingProblem}
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Coding Problem
                  </button>
                </div>

                {programmingProblems.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No coding problems added yet</p>
                    <button
                      onClick={addCodingProblem}
                      className="mt-4 text-purple-600 hover:text-purple-700"
                    >
                      Add your first coding problem
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {programmingProblems.map((problem, index) => (
                      <CodingProblem
                        key={index}
                        problem={problem}
                        index={index}
                        onUpdate={updateProgrammingProblem}
                        onDelete={deleteProgrammingProblem}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Allowed Attempts
        </label>
        <input
          type="number"
          value={testData.allowedAttempts}
          onChange={(e) =>
            setTestData({
              ...testData,
              allowedAttempts: parseInt(e.target.value),
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min="1"
        />
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="randomize"
          checked={testData.randomizeQuestions}
          onChange={(e) =>
            setTestData({ ...testData, randomizeQuestions: e.target.checked })
          }
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="randomize"
          className="text-sm font-medium text-gray-700"
        >
          Randomize question order
        </label>

        <input
          type="checkbox"
          id="ispublic"
          checked={ispublic}
          onChange={(e) => setispublic(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="ispublic"
          className="text-sm font-medium text-gray-700"
        >
          Is Public
        </label>
      </div>
    </div>

    {/* Show date and time only if not public */}
    {!ispublic && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={date|| ""}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    )}

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="font-medium text-blue-900 mb-2">Test Summary</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-blue-600">MCQ Questions</p>
          <p className="font-semibold text-blue-900">{questions.length}</p>
        </div>
        <div>
          <p className="text-blue-600">Coding Problems</p>
          <p className="font-semibold text-blue-900">
            {programmingProblems.length}
          </p>
        </div>
        <div>
          <p className="text-blue-600">Total Questions</p>
          <p className="font-semibold text-blue-900">
            {questions.length + programmingProblems.length}
          </p>
        </div>
        <div>
          <p className="text-blue-600">Duration</p>
          <p className="font-semibold text-blue-900">
            {testData.duration} min
          </p>
        </div>
      </div>
    </div>
  </div>
)}

           
          </div>
        </div>
      </div>

     
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`p-4 rounded-lg shadow-lg ${
              notification.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}
      <UrlCard url={Url}/>
    </div>

  );
};

export default TestCreationDashboard;