import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminForgotPasswordPage() {
  const [animationStep, setAnimationStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const getAnimatedText = () => {
    const texts = [
      "Reach out to your SuperAdmin",
      "Contact the SuperAdmin for help",
      "Your SuperAdmin can reset it",
      "Get assistance from SuperAdmin",
    ];
    return texts[animationStep];
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-white bg-opacity-5 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/2 w-40 h-40 bg-white bg-opacity-5 rounded-full animate-ping"></div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 max-h-full overflow-y-auto px-4">
        {/* PLC Branding */}
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-white mb-2 animate-pulse drop-shadow-2xl">
            PLC
          </h1>
          <p className="text-lg text-blue-200 tracking-widest">
            Personal Learning Club
          </p>
        </div>

        {/* Lock Icon */}
        <div className="mb-8">
          <div className="inline-block p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm animate-bounce">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
            Forgot Password?
          </h2>
          <p className="text-lg text-blue-200">
            Don't worry, we've got you covered!
          </p>
        </div>

        {/* Animated Message */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
            {getAnimatedText()}
          </h3>
          <p className="text-base text-blue-100">
            Password recovery requires SuperAdmin assistance
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-8 text-blue-100">
          <h4 className="text-lg font-semibold text-white mb-4">
            What to do next:
          </h4>
          <div className="space-y-2 text-sm max-w-md mx-auto">
            <p>1. Contact your SuperAdmin directly</p>
            <p>2. Provide your register number for verification</p>
            <p>3. Wait for password reset confirmation</p>
          </div>
        </div>

        {/* Action */}
        <div>
          <button
            onClick={() => window.history.back()}
            className="bg-red bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white font-bold py-2 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 border border-white border-opacity-30"
          >
            Go Back to Login
          </button>
          <p className="mt-4 text-sm text-blue-200">
            Remember your password?{" "}
            <Link to={"/adminLogin"} replace={true}  className="text-white hover:text-blue-200 font-semibold underline decoration-2 underline-offset-4">
            Try logging in again</Link>
              
          </p>
        </div>
      </div>
    </div>
  );
}
