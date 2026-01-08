import React, { useEffect, useState } from "react";
import { User, BookOpen, Percent } from "lucide-react";
import axios from "axios";

export default function AttendanceCard() {
      const [user,setuser]=useState({
        registerId:"",
        totalClasses:"",
        attendedClasses:""
      })
  useEffect(()=>{
    async function getAttendence(){
try {
  const cookies = Object.fromEntries(
          document.cookie.split("; ").map(c => c.split("="))
        );
        const registerNumber = cookies.registerNumber;
 const res= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/getattendence?registerNumber=${registerNumber}`)
console.log(res.data.data)
const user=res.data.data
setuser({
  registerId:user.registerNumber,
  totalClasses:user.classHeld,
  attendedClasses:user.classattend
})
} catch (error) {
  
}
    }
    getAttendence()
  },[])
  if (!user.totalClasses || user.totalClasses <= 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
        <p className="text-red-600">⚠️ Total classes must be greater than 0</p>
      </div>
    );
  }

  const percentage = ((user.attendedClasses / user.totalClasses) * 100).toFixed(2);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          Register ID: {user.registerId}
        </h2>
      </div>

      <div className="flex flex-col gap-2 text-gray-700">
        <p className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-500" />
          Total Classes: <span className="font-medium">{user.totalClasses}</span>
        </p>
        <p className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-500" />
          Attended: <span className="font-medium">{user.attendedClasses}</span>
        </p>
        <p className="flex items-center gap-2 text-lg font-bold">
          <Percent className="w-5 h-5 text-orange-500" />
          Attendance: {percentage}%
        </p>
      </div>
    </div>
  );
}
