import React, { useState } from 'react';
import { Users, BookOpen, Trophy, TrendingUp, Calendar, Clock, Target, Award, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClubProgressDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const naviagtion=useNavigate()
  // Sample data - you can replace this with real data from your backend
  const clubData = {
    totalStudents: 45,
    activeStudents: 38,
    totalSessions: 156,
    completedTests: 23,
    averageAttendance: 84,
    monthlyProgress: 12
  };

  const recentSessions = [
    { id: 1, title: "JavaScript Fundamentals", date: "2024-09-01", attendees: 28, duration: "2h" },
    { id: 2, title: "React Components", date: "2024-08-29", attendees: 32, duration: "2.5h" },
    { id: 3, title: "Database Design", date: "2024-08-27", attendees: 25, duration: "1.5h" },
    { id: 4, title: "API Integration", date: "2024-08-24", attendees: 30, duration: "2h" }
  ];

  const topPerformers = [
    { name: "Alex Chen", sessions: 18, tests: 8, score: 94 },
    { name: "Sarah Williams", sessions: 17, tests: 7, score: 91 },
    { name: "Mike Johnson", sessions: 16, tests: 6, score: 88 },
    { name: "Emily Davis", sessions: 15, tests: 7, score: 92 }
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Go back"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Club Progress Dashboard</h1>
                <p className="text-gray-600 mt-1">Track student progress and training sessions</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Session
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              onClick={()=>{
                naviagtion("/admin/upload")
              }}>
                New Test
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Students"
            value={clubData.totalStudents}
            subtitle={`${clubData.activeStudents} active`}
            color="blue"
          />
          <StatCard
            icon={BookOpen}
            title="Training Sessions"
            value={clubData.totalSessions}
            subtitle="This semester"
            color="green"
          />
          <StatCard
            icon={Trophy}
            title="Tests Conducted"
            value={clubData.completedTests}
            subtitle="Completed assessments"
            color="purple"
          />
          <StatCard
            icon={TrendingUp}
            title="Avg. Attendance"
            value={`${clubData.averageAttendance}%`}
            subtitle={`+${clubData.monthlyProgress}% this month`}
            color="orange"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: Target },
                { id: 'sessions', label: 'Recent Sessions', icon: Calendar },
                { id: 'performance', label: 'Top Performers', icon: Award }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Progress Chart Placeholder */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress</h3>
                    <div className="h-48 bg-white rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Progress chart visualization</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Quick Insights</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Next Session</p>
                          <p className="text-sm text-blue-700">React Advanced Patterns - Tomorrow 2:00 PM</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Trophy className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">Latest Achievement</p>
                          <p className="text-sm text-green-700">15 students passed the React fundamentals test</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Target className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium text-orange-900">Monthly Goal</p>
                          <p className="text-sm text-orange-700">78% progress towards 50 completed sessions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Training Sessions</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
                </div>
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentSessions.map((session) => (
                        <tr key={session.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{session.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {session.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">{session.attendees}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {session.duration}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Top Performing Students</h3>
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>This Month</option>
                    <option>Last 3 Months</option>
                    <option>This Semester</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topPerformers.map((student, index) => (
                    <div key={student.name} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <h4 className="font-semibold text-gray-900">{student.name}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{student.score}%</p>
                          <p className="text-xs text-gray-500">Avg Score</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{student.sessions}</p>
                          <p className="text-xs text-gray-500">Sessions Attended</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{student.tests}</p>
                          <p className="text-xs text-gray-500">Tests Completed</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Attendance Trends */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h3>
            <div className="space-y-3">
              {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => {
                const percentage = 85 + Math.random() * 10;
                return (
                  <div key={week} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{week}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{Math.round(percentage)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Mid-term Assessment</p>
                  <p className="text-sm text-gray-500">September 15, 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Project Showcase</p>
                  <p className="text-sm text-gray-500">September 22, 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <Trophy className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Skills Competition</p>
                  <p className="text-sm text-gray-500">October 5, 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Session Completion</span>
                  <span className="text-sm font-medium text-gray-900">89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Test Pass Rate</span>
                  <span className="text-sm font-medium text-gray-900">76%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Engagement Score</span>
                  <span className="text-sm font-medium text-gray-900">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProgressDashboard;