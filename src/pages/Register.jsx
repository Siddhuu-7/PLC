import React, { useState } from 'react';
import { Upload, User, Phone, Calendar, BookOpen, Camera ,Mail} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    registerNumber: '',
    password: '',
    confirmPassword: '',
    branch: '',
    mobileNumber: '',
    gmail:"",
    year: '',
    userImg: null,
    courses: []
  });
  const naviagtion=useNavigate()
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const branches = [
    'Computer Science Engineering',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Information Technology',
    'Chemical Engineering',
    'Biotechnology'
  ];

  const availableCourses = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Programming Fundamentals',
    'Data Structures',
    'Algorithms',
    'Database Systems',
    'Web Development',
    'Mobile Development',
    'Machine Learning'
  ];

  const currentYear = new Date().getFullYear();
  const years = [1, 2, 3, 4];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          userImg: 'Image size should be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        userImg: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.userImg) {
        setErrors(prev => ({
          ...prev,
          userImg: ''
        }));
      }
    }
  };

  const handleCourseToggle = (course) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.includes(course)
        ? prev.courses.filter(c => c !== course)
        : [...prev.courses, course]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.registerNumber.trim()) newErrors.registerNumber = 'Register number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    if (!formData.year) newErrors.year = 'Year is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    try {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('registerNumber', formData.registerNumber);
      data.append('password', formData.password);
      data.append('branch', formData.branch);
      data.append('mobileNumber', formData.mobileNumber);
      data.append("gmail",formData.gmail)
      data.append('year', formData.year);
      data.append('userImg', formData.userImg); 
      formData.courses.forEach((course, idx) =>
        data.append(`courses[${idx}]`, course)
      );

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials:true
        }
      );

      alert('Registration successful! Welcome to PLC.');
      if(res.data.msg){
        naviagtion("/verfiy")
      }else{
              alert('Registration failed. Please try again.');

      }

    } catch (error) {
      console.error('Signup failed:', error);
      alert('Registration failed. Please try again.');
    }
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-gray-800 mb-3 font-serif tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">PLC</h1>
          <p className="text-gray-600 text-xl font-medium tracking-wide">Personal Learning Club</p>
        </div>

        {/* Registration Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
              <h2 className="text-4xl font-bold text-white mb-2 font-serif tracking-wide">Student Registration</h2>
              <p className="text-blue-100 font-medium text-lg">Begin your journey to academic excellence</p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Profile Image Upload */}
                <div className="md:col-span-2 flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-blue-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {errors.userImg && <p className="text-red-500 text-sm mt-2 text-center">{errors.userImg}</p>}
                </div>

                {/* Personal Information */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans tracking-wide uppercase">
                    <User className="w-4 h-4 inline mr-2" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans tracking-wide uppercase">
                    <User className="w-4 h-4 inline mr-2" />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans tracking-wide uppercase">
                    Register Number *
                  </label>
                  <input
                    type="text"
                    name="registerNumber"
                    value={formData.registerNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.registerNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your register number"
                  />
                  {errors.registerNumber && <p className="text-red-500 text-sm mt-1">{errors.registerNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans tracking-wide uppercase">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans tracking-wide uppercase">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Gmail *
                  </label>
                  <input
                    type="email"
                    name="gmail"
                    value={formData.gmail}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.gmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your example@gmail.com"
                  required/>
                  {errors.gmail && <p className="text-red-500 text-sm mt-1">{errors.gmail}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans tracking-wide uppercase">
                    Branch/Department *
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.branch ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                  {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans tracking-wide uppercase">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Academic Year *
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.year ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your year</option>
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year === 1 ? '1st Year' : year === 2 ? '2nd Year' : year === 3 ? '3rd Year' : '4th Year'}
                      </option>
                    ))}
                  </select>
                  {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                </div>

                {/* Password Fields */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans tracking-wide uppercase">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Create a password"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans tracking-wide uppercase">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Course Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-4 font-sans tracking-wide uppercase">
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    Select Courses (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableCourses.map(course => (
                      <label key={course} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.courses.includes(course)}
                          onChange={() => handleCourseToggle(course)}
                          className="hidden"
                        />
                        <div className={`flex items-center justify-center w-full p-3 border-2 rounded-lg transition-all ${
                          formData.courses.includes(course)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}>
                          <span className="text-sm font-medium">{course}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-lg font-sans tracking-wide"
                >
                  REGISTER NOW
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600 font-medium">
                  Already have an account?{' '}
                  <button type="button" className="text-blue-600 font-bold hover:text-blue-800 transition-colors tracking-wide" onClick={()=>{
                    naviagtion('/login')
                  }}>
                    SIGN IN
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}