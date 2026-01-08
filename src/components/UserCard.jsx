import React, { useState } from 'react';
import { User, Calendar, Clock, Phone, CheckCircle, XCircle, Eye, BookOpen, GraduationCap, Send, Loader } from 'lucide-react';

// UserCard Componen
const UserCard = ({ user, onUpdateAttendance, onViewDetails }) => {
  const getAttendanceColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAttendanceIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* User Header */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg overflow-hidden">
          {user.userImg ? (
            <img 
              src={user.userImg} 
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              {user.firstName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{fullName}</h3>
          <p className="text-sm text-gray-600">Reg: {user.registerNumber}</p>
          <p className="text-xs text-gray-500"> Year {user.year}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getAttendanceColor(user.attendanceStatus)}`}>
          <span className="flex items-center gap-1">
            {getAttendanceIcon(user.attendanceStatus)}
            {user.attendanceStatus || 'Not marked'}
          </span>
        </div>
      </div>

      {/* Quick Info */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          {user.mobileNumber || 'N/A'}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <BookOpen className="w-4 h-4 mr-2" />
          {user.courses ? `${user.courses.length} courses enrolled` : 'No courses assigned'}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onUpdateAttendance(user.id, 'present')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            user.attendanceStatus === 'present'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          <CheckCircle className="w-4 h-4 inline mr-1" />
          Present
        </button>
        <button
          onClick={() => onUpdateAttendance(user.id, 'absent')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            user.attendanceStatus === 'absent'
              ? 'bg-red-600 text-white'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          <XCircle className="w-4 h-4 inline mr-1" />
          Absent
        </button>
        <button
          onClick={() => onViewDetails(user)}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors"
        >
          <Eye className="w-4 h-4 inline mr-1" />
          Details
        </button>
      </div>
    </div>
  );
};
export default UserCard