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
// AdminActionCard Component
const AdminActionCard = ({ card, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 cursor-pointer border border-gray-100 hover:border-blue-200 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={card.action}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'slideInUp 0.6s ease-out forwards'
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      
      {/* Floating Particles Effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
      <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
      
      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`w-18 h-18 ${card.bgColor} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg`}>
            <div className={`w-10 h-10 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500 font-medium">Click to view</span>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
          {card.title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed text-sm">
          {card.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className={`px-4 py-2 ${card.bgColor} rounded-full border-2 border-transparent group-hover:border-blue-200 transition-all duration-300`}>
          </div>
          <div className={`w-10 h-10 bg-gradient-to-r ${card.color} rounded-full flex items-center justify-center shadow-lg transform ${isHovered ? 'rotate-12 scale-110' : ''} transition-all duration-300`}>
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Animated Border */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${card.color} transform origin-left transition-all duration-700 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
    </div>
  );
};
export default AdminActionCard