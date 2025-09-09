import React, { useState, useEffect } from 'react';
import {
  User, Calendar, BookOpen, Trophy, Clock, TrendingUp,
  Award, Target, CheckCircle, XCircle, Users, Star,
  BarChart3, PieChart, Activity, GraduationCap,
  ChevronRight, Medal, Crown, Download, Eye
} from 'lucide-react';

const StudentDashboard = () => {
  // State for different data sections
  const [attendanceData, setAttendanceData] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [participatedTests, setParticipatedTests] = useState([]);
  const [topPerformers, setTopPerformers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data - replace with actual API calls
  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Sample attendance data
        setAttendanceData([
          { subject: 'Mathematics', totalClasses: 45, attended: 42, percentage: 93.3 },
          { subject: 'Physics', totalClasses: 40, attended: 38, percentage: 95.0 },
          { subject: 'Chemistry', totalClasses: 42, attended: 35, percentage: 83.3 },
          { subject: 'English', totalClasses: 30, attended: 28, percentage: 93.3 },
        ]);

        // Sample enrolled courses
        setEnrolledCourses([
          { 
            id: 1, 
            name: 'Advanced Mathematics', 
            instructor: 'Dr. Smith',
            progress: 75,
            nextClass: '2024-01-15T10:00:00',
            status: 'active'
          },
          { 
            id: 2, 
            name: 'Physics Laboratory', 
            instructor: 'Prof. Johnson',
            progress: 60,
            nextClass: '2024-01-16T14:00:00',
            status: 'active'
          },
          { 
            id: 3, 
            name: 'Organic Chemistry', 
            instructor: 'Dr. Williams',
            progress: 45,
            nextClass: '2024-01-17T09:00:00',
            status: 'active'
          }
        ]);

        // Sample participated tests
        setParticipatedTests([
          {
            id: 1,
            testName: 'Mathematics Mid-term',
            subject: 'Mathematics',
            score: 85,
            maxScore: 100,
            date: '2024-01-10',
            rank: 5,
            totalStudents: 45
          },
          {
            id: 2,
            testName: 'Physics Quiz 3',
            subject: 'Physics',
            score: 92,
            maxScore: 100,
            date: '2024-01-08',
            rank: 2,
            totalStudents: 38
          },
          {
            id: 3,
            testName: 'Chemistry Lab Test',
            subject: 'Chemistry',
            score: 78,
            maxScore: 100,
            date: '2024-01-05',
            rank: 12,
            totalStudents: 42
          }
        ]);

        // Sample top performers for latest test
        setTopPerformers([
          { name: 'Alex Johnson', score: 98, rank: 1 },
          { name: 'Sarah Smith', score: 95, rank: 2 },
          { name: 'Current Student', score: 92, rank: 3 },
          { name: 'Mike Davis', score: 90, rank: 4 },
          { name: 'Emma Wilson', score: 88, rank: 5 }
        ]);

        /* 
        // Uncomment and modify these for actual API integration
        const attendance = await fetch('/api/student/attendance').then(res => res.json());
        setAttendanceData(attendance);

        const courses = await fetch('/api/student/courses').then(res => res.json());
        setEnrolledCourses(courses);

        const tests = await fetch('/api/student/tests').then(res => res.json());
        setParticipatedTests(tests);

        const toppers = await fetch('/api/tests/toppers/latest').then(res => res.json());
        setTopPerformers(toppers);
        */

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate overall stats
  const overallAttendance = attendanceData.length > 0 
    ? attendanceData.reduce((acc, curr) => acc + curr.percentage, 0) / attendanceData.length 
    : 0;
  
  const averageScore = participatedTests.length > 0
    ? participatedTests.reduce((acc, curr) => acc + (curr.score / curr.maxScore * 100), 0) / participatedTests.length
    : 0;

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <Trophy className="w-5 h-5 text-blue-500" />;
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl sm:text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className={`w-8 h-8 sm:w-12 sm:h-12 ${color}`} />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="bg-blue-100 p-2 rounded-lg">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's your academic overview</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatCard
            title="Overall Attendance"
            value={`${overallAttendance.toFixed(1)}%`}
            icon={CheckCircle}
            color="text-green-600"
            subtitle={`${attendanceData.length} subjects`}
          />
          <StatCard
            title="Enrolled Courses"
            value={enrolledCourses.length}
            icon={BookOpen}
            color="text-blue-600"
            subtitle="Active courses"
          />
          <StatCard
            title="Tests Taken"
            value={participatedTests.length}
            icon={Trophy}
            color="text-purple-600"
            subtitle="This semester"
          />
          <StatCard
            title="Average Score"
            value={`${averageScore.toFixed(1)}%`}
            icon={TrendingUp}
            color="text-orange-600"
            subtitle="All tests"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Attendance Section */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Attendance Overview
                  </h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details <ChevronRight className="w-4 h-4 inline ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {attendanceData.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{subject.subject}</h3>
                        <p className="text-sm text-gray-600">
                          {subject.attended}/{subject.totalClasses} classes attended
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${subject.percentage}%` }}
                          ></div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor(subject.percentage)}`}>
                          {subject.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                    Enrolled Courses
                  </h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All <ChevronRight className="w-4 h-4 inline ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{course.name}</h3>
                          <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 text-right">
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            {course.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {new Date(course.nextClass).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Participated Tests */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-purple-600" />
                    Recent Test Results
                  </h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All <ChevronRight className="w-4 h-4 inline ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {participatedTests.map((test) => (
                    <div key={test.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{test.testName}</h3>
                          <p className="text-sm text-gray-600">{test.subject}</p>
                          <p className="text-xs text-gray-500">{new Date(test.date).toLocaleDateString()}</p>
                        </div>
                        <div className="mt-3 sm:mt-0 flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-blue-600">
                              {test.score}/{test.maxScore}
                            </p>
                            <p className="text-xs text-gray-600">Score</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center">
                              {getRankIcon(test.rank)}
                              <span className="ml-1 font-semibold">#{test.rank}</span>
                            </div>
                            <p className="text-xs text-gray-600">of {test.totalStudents}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                              title="Download Report"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Top Performers */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  Latest Test Rankings
                </h2>
                <p className="text-sm text-gray-600 mt-1">Physics Quiz 3 - Top Performers</p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  {topPerformers.map((performer, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        performer.name === 'Current Student' 
                          ? 'bg-blue-50 border-2 border-blue-200' 
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          {getRankIcon(performer.rank)}
                          <span className="ml-2 font-semibold text-gray-900">
                            #{performer.rank}
                          </span>
                        </div>
                        <div>
                          <p className={`font-medium ${
                            performer.name === 'Current Student' 
                              ? 'text-blue-700' 
                              : 'text-gray-900'
                          }`}>
                            {performer.name}
                            {performer.name === 'Current Student' && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                You
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{performer.score}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;