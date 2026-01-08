import React, { useState } from 'react';
import { BookOpen, User, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StudentLogin() {
  const [formData, setFormData] = useState({
    registerNumber: '',
    password: ''
  });
  const naviagtion=useNavigate()
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.registerNumber.trim()) {
      newErrors.registerNumber = 'Register number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
   if (validateForm()) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
      formData,
      { withCredentials: true }
    );

    if (res.data?.msg) {
      naviagtion('/home'); 
      
    } else {
      setErrors({
        password:res.data.msg
      })
      console.log("Login failed:", res.data);
    }

  } catch (error) {
    
    if (error.response) {
      setErrors({
        password:error.response.data.msg
      })
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      
      console.error("No response from server:", error.request);
    } else {
    
      console.error("Error:", error.message);
    }
  }
} else {
  console.warn("Form validation failed!");
}

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6 shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-gray-800 mb-3 font-serif tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">PLC</h1>
            <p className="text-gray-600 text-xl font-medium tracking-wide">Personal Learning Club</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-2 font-serif tracking-wide">Student Login</h2>
              <p className="text-blue-100 font-medium">Access your learning portal</p>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans tracking-wide uppercase">
                    <User className="w-4 h-4 inline mr-2" />
                    Register Number *
                  </label>
                  <input
                    type="text"
                    name="registerNumber"
                    value={formData.registerNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                      errors.registerNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your register number"
                  />
                  {errors.registerNumber && <p className="text-red-500 text-sm mt-1">{errors.registerNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans tracking-wide uppercase">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
              </div>
                        {/* <div className='text-left mt-4'>
                          <p >Wrong Password</p>
                        </div> */}
              <div className="text-right mt-4">
                
                <button type="button" className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm">
                  Forgot Password?
                </button>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-lg font-sans tracking-wide"
                >
                  LOGIN
                </button>
              </div>

              {/* Register Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600 font-medium">
                  Don't have an account?{' '}
                  <button type="button" className="text-blue-600 font-bold hover:text-blue-800 transition-colors tracking-wide" onClick={()=>{
                    naviagtion('/register')
                  }}>
                    REGISTER NOW
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Need help? Contact us at{' '}
              <span className="text-blue-600 font-medium">codingclub.@plc</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}