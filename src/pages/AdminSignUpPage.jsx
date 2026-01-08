import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
export default function AdminSignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    registerNumber: '',
    password: '',
    confirmPassword: '',
    branch: '',
    mobileNumber: '',
    year: '',
    file: null
  });
  const [file,setFIle]=useState(null)
  const navigation=useNavigate()
  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFIle(e.target.files[0])
      alert("file Upoaded")
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async() => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
   
    const submitData = new FormData();
    submitData.append('firstName', formData.firstName);
    submitData.append('lastName', formData.lastName);
    submitData.append('registerNumber', formData.registerNumber);
    submitData.append('password', formData.password);
    submitData.append('branch', formData.branch);
    submitData.append('mobileNumber', formData.mobileNumber);
    submitData.append('year', Number(formData.year));
     submitData.append('file', file);
    if(!formData.userImg){
      return alert("pic upload")
    }
   
    try {
      const res =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/signUp?admin=${true}`,submitData,{
        withCredentials:true
      })
     const isdata=res.data.data
     if(isdata){
      navigation("/admin/home")
     }else{
      alert("signUp Failed or Server")
     }
    } catch (error) {
      console.log(error)
      
    }
    
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold text-blue-600">PLC</h1>
            <p className="text-sm text-gray-500">Personal Learning Club</p>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Sign Up
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your admin account for the club
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="First name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="registerNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Register Number
                </label>
                <input
                  id="registerNumber"
                  name="registerNumber"
                  type="text"
                  required
                  value={formData.registerNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your register number"
                />
              </div>

              <div>
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                  Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  required
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your branch</option>
                  <option value="CSE">Computer Science Engineering</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="EEE">Electrical & Electronics</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CE">Civil Engineering</option>
                  <option value="IT">Information Technology</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mobile number"
                  />
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    id="year"
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="userImg" className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image 
                </label>
                <input
                  id="userImg"
                  name="userImg"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required/>
                {formData.userImg && (
                  <p className="mt-1 text-sm text-gray-600">
                    Selected: {formData.userImg.name}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Create Account
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600">
                Already have an admin account?{' '}
                <Link to={"/admin/login"} className="font-medium text-blue-600 hover:text-blue-500" replace={true}>
                  Sign in here
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}