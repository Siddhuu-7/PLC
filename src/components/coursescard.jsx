import React, { useState } from 'react';
import { BookOpen, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';

export function CoursesCard({ userData, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [courses, setCourses] = useState([...(userData.courses || [])]);
  const [error, setError] = useState('');

  const addCourse = () => {
    setCourses([...courses, '']);
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const updateCourse = (index, value) => {
    setCourses(courses.map((course, i) => i === index ? value : course));
  };

  const validate = () => {
    const filteredCourses = courses.filter(course => course.trim() !== '');
    if (filteredCourses.length === 0) {
      setError('At least one course is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = () => {
    if (validate()) {
      const filteredCourses = courses.filter(course => course.trim() !== '');
      onUpdate('courses', filteredCourses);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setCourses([...(userData.courses || [])]);
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 font-serif italic tracking-wide">Enrolled Courses</h3>
        <div className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
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
      </div>
      
      <div className="space-y-3">
        {isEditing ? (
          <div className="space-y-3">
            {courses.map((course, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={course}
                  onChange={(e) => updateCourse(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter course name"
                />
                <button 
                  onClick={() => removeCourse(index)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button 
              onClick={addCourse}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Course</span>
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {userData.courses?.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <span className="font-medium text-gray-800">{course}</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}