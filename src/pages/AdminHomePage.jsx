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
  BookOpen,
  Vote
} from "lucide-react";
// Individual Components (you would import these from separate files)
import AdminHeader from "../components/AdminHeader";
import QuickStatsCard from "../components/QuickStatsCard";
import AdminActionCard from "../components/AdminActionCard "
import QuickActionsBar from "../components/QuickActionsBar ";
// QuickStatsCard Component

import { useNavigate } from "react-router-dom";




// Main Homepage Component
export default function Homepage() {
  // Just console logs - you can replace with your own logic
  const handleProfileClick = () => {
    naviagtion('/admin/profile')
  };
const naviagtion=useNavigate()
  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
  };
const navigation=useNavigate()
  const handleCardAction = (path) => {
    navigation(path)
  };

  const adminCards = [
    {
      title: "Post Attendance",
      description: "Mark and track student attendance for today's sessions with detailed analytics",
      icon: Calendar,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      action: () => handleCardAction("/attendence")
    },
    {
      title: "Manage Links",
      description: "Add study materials, resources, and important educational links",
      icon: Link,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      action: () => handleCardAction("/admin/resourcesahre")
    },
    {
      title: "Student Management",
      description: "View, add, and manage comprehensive student profiles and records",
      icon: Users,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      action: () => handleCardAction("/admin/AdminStudentManagement")
    },
    {
      title: "Analytics Dashboard",
      description: "View detailed attendance trends and learning progress reports",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      action: () => handleCardAction("/student/analytics")
    },
    {
      title: "Announcements",
      description: "Send notifications and important updates to all students",
      icon: Bell,
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      action: () => handleCardAction("/admin/announcements")
    },
    {
      title: "POll",
      description: "Generate and manage course Polls",
      icon: Vote,
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-50",
      action: () => handleCardAction("/vote")
    },
    // {
    //   title: "Certificates",
    //   description: "Generate and manage course completion certificates and awards",
    //   icon: Award,
    //   color: "from-yellow-500 to-amber-600",
    //   bgColor: "bg-yellow-50",
    //   action: () => handleCardAction("certificates")
    // }
  ];

  const quickStats = [
    { label: "Active Students", value: "156", change: "+12", icon: Users },
    { label: "Today's Attendance", value: "87%", change: "+5%", icon: TrendingUp },
    { label: "Pending Tasks", value: "4", change: "-2", icon: Clock },
    { label: "Course Progress", value: "73%", change: "+8%", icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <AdminHeader onProfileClick={handleProfileClick} />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-12">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your learning club efficiently with these powerful admin tools and real-time insights
          </p>
        </div>

        {/* Quick Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <QuickStatsCard key={index} stat={stat} />
          ))}
        </div> */}

        {/* Admin Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminCards.map((card, index) => (
            <AdminActionCard key={index} card={card} index={index} />
          ))}
        </div>

        {/* Quick Actions */}
        {/* <QuickActionsBar onAction={handleQuickAction} /> */}
      </main>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}