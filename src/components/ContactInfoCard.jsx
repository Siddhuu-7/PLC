import React, { useState } from 'react';
import { Phone, Edit2, Save, X } from 'lucide-react';

export function ContactInfoCard({ userData, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(userData.mobileNumber || '');
  const [error, setError] = useState('');

  const validate = () => {
    if (!mobileNumber) {
      setError('Mobile number is required');
      return false;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = () => {
    if (validate()) {
      onUpdate('mobileNumber', mobileNumber);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setMobileNumber(userData.mobileNumber || '');
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 font-serif italic tracking-wide">Contact Information</h3>
        <Phone className="w-6 h-6 text-blue-600" />
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-600 italic">Mobile Number</label>
          {isEditing ? (
            <div className="flex space-x-2">
              <button 
                onClick={handleSave}
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
              <button 
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {isEditing ? (
          <div>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                if (error) setError('');
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        ) : (
          <p className="text-lg text-gray-800 font-medium">+91 {userData.mobileNumber}</p>
        )}
      </div>
    </div>
  );
}