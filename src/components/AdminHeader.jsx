import React from "react";
import {
  Users,
  Link,
  Calendar,
  BarChart3,
  Bell,
  Award,
  TrendingUp,
  Clock,
  BookOpen
} from "lucide-react";

// Individual Components (you would import these from separate files)
import { useState, useEffect } from "react";
import { User, ChevronRight, Activity, Eye, Zap, Settings } from "lucide-react";

// AdminHeader Component
const AdminHeader = ({ onProfileClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl animate-pulse">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-bounce"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif tracking-wide bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              PLC Admin
            </h1>
            <p className="text-sm text-gray-500 font-medium">Personal Learning Club Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-700">Welcome back, Admin</p>
            <p className="text-xs text-gray-500 font-mono">{currentTime.toLocaleString()}</p>
          </div>
          <div className="relative">
            <button
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              onClick={onProfileClick}
            >
              <User className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium">Profile</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default AdminHeader