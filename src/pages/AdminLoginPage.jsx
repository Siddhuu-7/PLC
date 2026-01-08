import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    registerNumber: '',
    password: ''
  });
  const navigation=useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async() => {
    try {
      const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login?registerNumber=${formData.registerNumber}&password=${formData.password}`,{
        withCredentials:true
      })
      if(res.data){
        navigation('/admin/home')
        console.log(res.data.msg)
      }
    } catch (error) {
      console.log(error.response.data.msg)
      
    }
    
    
  };
  useEffect(()=>{
    async function autoLogin() {
      try {
       const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login?autologin=${true}`,{
          withCredentials:true
        })
        if(res.data.msg){
          navigation('/admin/home')
          console.log(res.data)
        }
     
      } catch (error) {
        console.log(error)
       
      }
    }
    autoLogin()
  },[])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold text-blue-600">PLC</h1>
            <p className="text-sm text-gray-500">Personal Learning Club</p>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage your club
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-4">
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
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Sign In
              </button>
            </div>
            
            <div className="mt-4 text-center space-y-2">
            <Link to ={"/notice"}>Forgot Password</Link>              
              <div className="text-sm text-gray-600">
                Don't have an admin account?{' '}
                <Link className="font-medium text-blue-600 hover:text-blue-500" to={"/admin/signup"} replace={true}>Sign up here</Link>
                  
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}