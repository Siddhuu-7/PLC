import React, { useState } from 'react';
import { User, Edit2, Save, X } from 'lucide-react';

export function PasswordCard({ userData, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onUpdate('password', password);
      setIsEditing(false);
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 font-serif italic tracking-wide">Account Security</h3>
        <User className="w-6 h-6 text-blue-600" />
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-600 italic">Password:</span>
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
            <div className="space-y-3">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter new password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          ) : (
            <p className="text-lg text-gray-800 font-medium">••••••••</p>
          )}
        </div>

        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <span className="font-semibold text-gray-600 italic">Account Status:</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">Active</span>
        </div>
      </div>
    </div>
  );
}