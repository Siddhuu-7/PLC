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

export default function Homepage() {
  const navigate = useNavigate();

  // --- STATE ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizData, setQuizData] = useState([]);

  // --- SAMPLE DATA ---
  const galleryImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400", alt: "Campus Event 1" },
    { id: 2, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400", alt: "Study Session" },
    { id: 3, src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400", alt: "Laboratory" },
  ];

  const [attendanceData,setAttendance] = useState(
    { present: 0, total: 0, percentage: 0 }
  )

  const todaySessions = [
    { subject: "Mathematics", time: "09:00 AM - 10:30 AM", instructor: "Dr. Smith", status: "upcoming" },
    { subject: "Physics", time: "11:00 AM - 12:30 PM", instructor: "Prof. Johnson", status: "ongoing" },
    { subject: "Chemistry", time: "02:00 PM - 03:30 PM", instructor: "Dr. Wilson", status: "upcoming" },
  ];

  // --- IMAGE SLIDER ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  // --- FETCH QUIZ DATA ---
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_backend_Url}/api/questions/alltests`);
       
        setQuizData(res.data); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchTestData();
     const fetchAttData = async () => {
      try {
       
        const cookies = Object.fromEntries(
          document.cookie.split("; ").map(c => c.split("="))
        );
        const registerNumber = cookies.registerNumber;
        console.log(registerNumber)
        const res = await axios.get(`${import.meta.env.VITE_backend_Url}/api/users/getattendence/?registerNumber=${registerNumber}`);
        console.log("API response:", res.data);
        setAttendance({
          present:res.data.data.classattend,
          total:res.data.data.classHeld,
          percentage:(Number(attendanceData.present/Number(attendanceData.total))*Number(100))
        })
      } catch (err) {
        console.error(err);
      }
    };
    fetchAttData()
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

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "available":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
  <LinksCard title="Course Materials" href="/materials" />
  <LinksCard title="Assignments" href="/assignments" />

</div>

          {/* Attendance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 font-serif italic">Attendance</h3>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - attendanceData.percentage / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">{attendanceData.percentage}%</span>
                </div>
              </div>
              <p className="text-gray-600">
                <span className="font-bold text-green-600">{attendanceData.present}</span> / {attendanceData.total} classes
              </p>
            </div>
          </div>

          {/* Today's Sessions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 font-serif italic">Today's Sessions</h3>
            <div className="space-y-3">
              {todaySessions.map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-bold text-gray-800">{session.subject}</p>
                    <p className="text-sm text-gray-600">{session.time}</p>
                    <p className="text-xs text-gray-500">{session.instructor}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(session.status)}`}>
                    {session.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-white rounded-xl shadow-lg p-6 relative">
            <h3 className="text-xl font-bold mb-4 font-serif italic">Gallery</h3>
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quiz/Tests Slider */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold font-serif italic">Quizzes & Tests</h3>
                <div className="flex space-x-2">
              
                </div>
              </div>

              {quizData?.alltestdata?.length > 0 ? (
                quizData.alltestdata.map((quiz) => (
                  <TestCard
                    key={quiz._id}
                    quiz={quiz} // pass single quiz to the card
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
