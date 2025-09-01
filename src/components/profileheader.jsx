import React from 'react';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ProfileHeader() {
  const navigation=useNavigate()
  const handleBack = () => {
  if (window.history.length > 1) {
    navigation(-1);
  } else {
    navigation("/"); // fallback route (e.g., home)
  }
};

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all" onClick={handleBack}>
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
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
        </div>
      </div>
    </header>
  );
}