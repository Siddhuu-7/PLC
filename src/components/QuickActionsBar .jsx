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
// QuickActionsBar Component
const QuickActionsBar = ({ onAction }) => {
  const quickActions = [
    { icon: Calendar, label: "Mark Attendance", color: "from-green-500 to-emerald-600", action: "attendance" },
    { icon: Link, label: "Add Resource", color: "from-blue-500 to-cyan-600", action: "links" },
    // { icon: Bell, label: "Send Alert", color: "from-purple-500 to-violet-600", action: "announcements" },
    // { icon: Settings, label: "Settings", color: "from-gray-500 to-slate-600", action: "settings" }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
          <Zap className="w-6 h-6 text-yellow-500" />
          <span>Quick Actions</span>
        </h3>
        <div className="text-xs text-gray-500 font-medium">Frequently used tools</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={`group flex flex-col items-center space-y-3 bg-gradient-to-r ${action.color} text-white p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
            onClick={() => onAction(action.action)}
          >
            <action.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold text-sm text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default QuickActionsBar