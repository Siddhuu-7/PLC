import React, { useState } from 'react';
import { User, Calendar, Clock, Phone, CheckCircle, XCircle, Eye, BookOpen, GraduationCap, Send, Loader } from 'lucide-react';

// UserCard Componen

// User Details Modal Component
const UserDetailsModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Student Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold text-xl overflow-hidden">
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
              <div className="ml-4">
                <h3 className="text-xl font-semibold">{fullName}</h3>
                <p className="text-gray-600">Reg: {user.registerNumber}</p>
                <p className="text-sm text-gray-500">{user.branch}</p>
              </div>
            </div>

            {/* Academic Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Academic Information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Branch</p>
                  <p className="font-medium text-gray-900">{user.branch}</p>
                </div>
                <div>
                  <p className="text-gray-600">Year</p>
                  <p className="font-medium text-gray-900">{user.year} Year</p>
                </div>
                <div>
                  <p className="text-gray-600">Register Number</p>
                  <p className="font-medium text-gray-900">{user.registerNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">Courses</p>
                  <p className="font-medium text-gray-900">
                    {user.courses ? user.courses.length : 0} enrolled
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t pt-4 space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Contact Information
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mobile Number</p>
                    <p className="text-sm text-gray-600">{user.mobileNumber || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Section */}
            {user.courses && user.courses.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Enrolled Courses
                </h4>
                <div className="space-y-2">
                            {user.courses.map((course, index) => (
              <div key={index} className="bg-gray-50 rounded-md p-3">
                <p className="font-medium text-gray-900">{course.name}</p>
                {course.code && <p className="text-sm text-gray-500">Code: {course.code}</p>}
                {course.credits && <p className="text-sm text-gray-500">Credits: {course.credits}</p>}
              </div>
))}

                </div>
              </div>
            )}

            {/* Current Attendance Status */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Today's Attendance</h4>
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                user.attendanceStatus === 'present' 
                  ? 'bg-green-100 text-green-800' 
                  : user.attendanceStatus === 'absent'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {user.attendanceStatus === 'present' && <CheckCircle className="w-4 h-4 mr-1" />}
                {user.attendanceStatus === 'absent' && <XCircle className="w-4 h-4 mr-1" />}
                {!user.attendanceStatus && <Clock className="w-4 h-4 mr-1" />}
                {user.attendanceStatus ? user.attendanceStatus.toUpperCase() : 'NOT MARKED'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetailsModal