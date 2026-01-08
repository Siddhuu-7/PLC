import React, { useState, useEffect } from "react";
import LinksCard from "./components/LinksCard";
import {
  User,
  Calendar,
  Clock,
  Camera,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TestCard from "./components/TestCard";
import axios from "axios";
import Loading from "./pages/LoadingPage";
import PollCard from "./components/PollComponent";
import  PollResultsCard from "./components/PollResultsCard";
import AttendenceCard from "./components/AttendenceCard";
export default function Homepage() {
  const navigate = useNavigate();

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizData, setQuizData] = useState([]);


 




  
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_backend_Url}/api/questions/alltests`);
       
        setQuizData(res.data.alltestdata || []); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchTestData();
    
  }, []);

  // --- QUIZ NAVIGATION ---
  const nextQuiz = () => {
    if (quizData.length === 0) return;
    setCurrentQuizIndex((prev) => (prev + 1) % quizData.length);
  };

  const prevQuiz = () => {
    if (quizData.length === 0) return;
    setCurrentQuizIndex((prev) => (prev - 1 + quizData.length) % quizData.length);
  };

useEffect(() => {
  const fetchTestData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_backend_Url}/api/questions/alltests`);
      console.log("API response:", res.data);
      setQuizData(res.data); // assume data has { alltestdata: [...] }
    } catch (error) {
      console.log(error);
    }
  };
  fetchTestData();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PLC
              </h1>
              <p className="text-xs italic text-gray-500 font-light">Personal Learning Club</p>
            </div>
          </div>
          <button
            className="flex items-center space-x-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/profile")}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Liks card */}
<div className="lg:col-span-3 grid md:grid-cols-3 gap-6 mb-6">
  <LinksCard title="Course Materials" href="/student/resource" />
</div>

          {/* Attendance */}
         <AttendenceCard href={"/student/dashboard"}/>

          {/* Today's Sessions */}
         <PollCard/>

          {/* Image Gallery */}
         <PollResultsCard/>

          {/* Quiz/Tests Slider */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold font-serif italic">Quizzes & Tests</h3>
                <div className="flex space-x-2">
              
                </div>
              </div>

              {Array.isArray(quizData) && quizData.length > 0 ? (
                quizData.map((quiz) => (
                  <TestCard
                    key={quiz._id}
                    quiz={quiz} 
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center">No quizzes/tests available</p>
              )}
            </div>
        </div>
      </main>
    </div>
  );
}
