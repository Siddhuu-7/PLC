import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProfileHeader } from './profileheader'
import { ProfileBasicInfo } from './profilebasicInfo';
import { ContactInfoCard } from './ContactInfoCard';
import { CoursesCard } from './coursescard'
import { PasswordCard } from './PasswordCard';
import { AcademicInfoCard } from './acadamicInfocard';
import LogoutButton from './Logout';

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); 
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="flex-shrink-0 ml-3 text-green-200 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function ProfilePage() {

  const [toast, setToast] = useState({
    isVisible: false,
    message: ''
  });

  const showToast = (message) => {
    setToast({
      isVisible: true,
      message: message
    });
  };

  const hideToast = () => {
    setToast({
      isVisible: false,
      message: ''
    });
  };

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    registerNumber: '',
    password: '******',
    branch: "",
    mobileNumber: '',
    year: 2,
    userImg: null,
    courses: []
  });

  useEffect(() => {
    async function userDetails() {
      try {
        const cookies = Object.fromEntries(
          document.cookie.split("; ").map(c => c.split("="))
        );
        const registerNumber = cookies.registerNumber;
        console.log(registerNumber)
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/details/?registerNumber=${registerNumber}`
        );

        const buffer = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/pics/?registerNumber=${registerNumber}`,
          {
            responseType: "arraybuffer" 
          }
        );
        const base64 = btoa(
          new Uint8Array(buffer.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setUserData({
          ...res.data.data,
          userImg: `data:image/jpeg;base64,${base64}` 
        });

      } catch (error) {
        console.log(error);
      }
    }

    userDetails();
  }, []);

  const updateField = async (place, field) => {
    try {
      if (place === "userImg") {
        const formData = new FormData();
        formData.append("registerNumber", userData.registerNumber); 
        formData.append("place", place);
        formData.append("file", field);

        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/update`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/update`, {
          registerNumber: userData.registerNumber,
          place,
          field,
        });
      }
      
      setUserData(prev => ({
        ...prev,
        [place]: place === 'userImg' ? prev.userImg : field 
      }));
      
      const fieldName = place === 'userImg' ? 'Profile picture' : 
                       place.charAt(0).toUpperCase() + place.slice(1).replace(/([A-Z])/g, ' $1');
      showToast(`${fieldName} updated successfully!`);
      
    } catch (err) {
      console.error(`Failed to update ${place}:`, err);
      showToast(`Failed to update ${place}. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <ProfileHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          <ProfileBasicInfo userData={userData} onUpdate={updateField} />

          <div className="grid md:grid-cols-2 gap-6">
            <ContactInfoCard userData={userData} onUpdate={updateField} />
            <CoursesCard userData={userData} onUpdate={updateField} />
            <AcademicInfoCard userData={userData} />
            <PasswordCard userData={userData} onUpdate={updateField} />
          </div>

          
          <div className="text-center mt-8">
           <LogoutButton/>
          </div>
        </div>
      </main>

    
      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={hideToast} 
      />

       <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}