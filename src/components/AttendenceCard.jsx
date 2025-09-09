import React from "react";
import { useNavigate } from "react-router-dom";
export default function AttendanceCard({href}) {
  const naviagtion=useNavigate()
  function navi(){
    naviagtion(href)
  }
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 font-serif italic">Analytics</h3>

      <div className="flex items-center justify-center">
        
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 via-yellow-400 to-blue-500 animate-spin-slow" onClick={navi}/>
      </div>
    </div>
  );
}
