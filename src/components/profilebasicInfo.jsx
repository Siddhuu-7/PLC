import React from 'react';
import { ProfileImageCard } from './ProfileCard';

export function ProfileBasicInfo({ userData, onUpdate }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        
        <ProfileImageCard userData={userData} onUpdate={onUpdate} />

        {/* Basic Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-2 font-serif italic">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-xl text-blue-600 font-medium mb-4">{userData.registerNumber}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-600 italic">Branch:</span>
              <p className="text-gray-800 font-medium">{userData.branch}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600 italic">Academic Year:</span>
              <p className="text-gray-800 font-medium">
                {userData.year === 1 ? '1st Year' : userData.year === 2 ? '2nd Year' : userData.year === 3 ? '3rd Year' : '4th Year'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}