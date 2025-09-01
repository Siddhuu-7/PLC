import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProfileHeader } from './profileheader'
import { ProfileBasicInfo } from './profilebasicInfo';
import { ContactInfoCard } from './ContactInfoCard';
import { CoursesCard } from './coursescard'
import { PasswordCard } from './PasswordCard';
import { AcademicInfoCard } from './acadamicInfocard';
import LogoutButton from './Logout';
export default function ProfilePage() {
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
          `${import.meta.env.VITE_backend_Url}/api/users/details/${registerNumber}`
        );

        const buffer = await axios.get(
          `${import.meta.env.VITE_backend_Url}/api/users/pics/?registerNumber=${registerNumber}`,
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

        await axios.put(`${import.meta.env.VITE_backend_Url}/api/users/update`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.put(`${import.meta.env.VITE_backend_Url}/api/users/update`, {
          registerNumber: userData.registerNumber,
          place,
          field,
        });
      }
      
     
      setUserData(prev => ({
        ...prev,
        [place]: place === 'userImg' ? prev.userImg : field 
      }));
      
      alert(`${place} updated successfully!`);
    } catch (err) {
      console.error(`Failed to update ${place}:`, err);
      alert(`Failed to update ${place}. Please try again.`);
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

          {/* Action Buttons */}
          <div className="text-center mt-8">
           <LogoutButton/>
          </div>
        </div>
      </main>
    </div>
  );
}