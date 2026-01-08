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
// Header Component
const QuickStatsCard = ({ stat }) => {
  const changeColor = stat.change.includes('+') ? 'text-green-600' : 'text-red-500';
  
  return (
    <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</p>
          <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
          <div className="flex items-center space-x-1">
            <Activity className="w-3 h-3 text-gray-400" />
            <p className={`text-xs font-semibold ${changeColor}`}> from last  few days</p>
          </div>
        </div>
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <stat.icon className="w-8 h-8 text-blue-600" />
        </div>
      </div>
    </div>
  );
};
export default QuickStatsCard