import React, { useState } from 'react';
import { User, Edit2, Save, X, Camera } from 'lucide-react';

export function ProfileImageCard({ userData, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSave = () => {
    if (imageFile) {
      onUpdate('userImg', imageFile);
    }
    setIsEditing(false);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImagePreview(null);
    setImageFile(null);
    setError('');
  };

  return (
    <div className="relative">
      <div className="w-32 h-32 rounded-full border-4 border-blue-200 overflow-hidden bg-gray-100 flex items-center justify-center">
        {imagePreview || userData.userImg ? (
          <img 
            src={imagePreview || userData.userImg} 
            alt="profile"
            className="w-full h-full object-cover" 
          />
        ) : (
          <User className="w-16 h-16 text-gray-400" />
        )}
      </div>
      
      {isEditing ? (
        <div className="absolute -bottom-2 -right-2 flex space-x-1">
          <label className="bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
            <Camera className="w-4 h-4 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <button 
            onClick={handleSave}
            className="bg-green-600 rounded-full p-2 hover:bg-green-700 transition-colors"
          >
            <Save className="w-4 h-4 text-white" />
          </button>
          <button 
            onClick={handleCancel}
            className="bg-gray-600 rounded-full p-2 hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setIsEditing(true)}
          className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition-colors"
        >
          <Edit2 className="w-4 h-4 text-white" />
        </button>
      )}
      {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
    </div>
  );
}