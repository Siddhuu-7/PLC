import React from 'react';
import { Calendar } from 'lucide-react';

export function AcademicInfoCard({ userData }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 font-serif italic tracking-wide">Academic Details</h3>
        <Calendar className="w-6 h-6 text-blue-600" />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-semibold text-gray-600 italic">Register Number:</span>
          <span className="font-medium text-gray-800">{userData.registerNumber}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-semibold text-gray-600 italic">Branch:</span>
          <span className="font-medium text-gray-800">{userData.branch}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-semibold text-gray-600 italic">Academic Year:</span>
          <span className="font-medium text-gray-800">
            {userData.year === 1 ? '1st Year' : userData.year === 2 ? '2nd Year' : userData.year === 3 ? '3rd Year' : '4th Year'}
          </span>
        </div>
      </div>
    </div>
  );
}