import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Landingpage() {
  const quotes = [
    "Education is the most powerful weapon which you can use to change the world.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Dream big, work hard, stay focused, and surround yourself with good people.",
    "The expert in anything was once a beginner.",
    "Education is not preparation for life; education is life itself."
  ];
  const navigation=useNavigate()
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
      useEffect(() => {
    const checkLogin = async () => {
      try {
         const cookies = Object.fromEntries(
          document.cookie.split("; ").map(c => c.split("="))
        );
        if(cookies.token){
          const res = await axios.get(
          `${import.meta.env.VITE_backend_Url}/api/users/autologin`,
          { withCredentials: true }
        );

        if (res.data?.msg) {
          navigation("/home");
        } else {
          navigation("/");
        }
        }
      } catch (error) {
        console.error("Auto login failed:", error.message);
        navigation("/");
      }
    };

    checkLogin();
  }, [navigation]);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3 animate-pulse">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-serif tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            PLC
          </h1>
        </div>
        
        <div className="flex space-x-4">
          <button className="px-6 py-2 text-blue-600 font-bold border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105" onClick={()=>{
            navigation('/login')
          }}>
            Join club
          </button>
          
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[80vh]">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-bounce mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-7xl md:text-8xl font-bold text-gray-800 mb-8 font-serif tracking-wide leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              PLC
            </span>
          </h2>
          
          <h3 className="text-3xl md:text-4xl text-gray-700 mb-12 font-medium tracking-wide animate-slide-up">
            Premier Learning Center
          </h3>

          {/* Animated Quote */}
          <div className="mb-12 h-24 flex items-center justify-center">
            <blockquote 
              className={`text-lg md:text-xl text-gray-600 font-medium italic max-w-3xl transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              "{quotes[currentQuote]}"
            </blockquote>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
            <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl text-lg tracking-wide group">
              START YOUR JOURNEY
              <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg tracking-wide transform hover:scale-110">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-1/4 left-10 animate-float hidden lg:block">
        <div className="w-16 h-16 bg-blue-200 rounded-full opacity-30"></div>
      </div>
      <div className="fixed top-1/3 right-10 animate-float-delayed hidden lg:block">
        <div className="w-12 h-12 bg-indigo-200 rounded-full opacity-40"></div>
      </div>
      <div className="fixed bottom-1/4 left-1/4 animate-float hidden lg:block">
        <div className="w-8 h-8 bg-purple-200 rounded-full opacity-50"></div>
      </div>

      <style >{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 1s ease-out 0.5s both;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatDelayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}