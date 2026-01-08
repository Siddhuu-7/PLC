import axios from "axios";
import React, { useEffect, useState } from "react";
import CodingTestPlatform from "../components/CodingTestPlatform";
import { useLocation, useNavigate } from "react-router-dom";

export default function MCQSpage() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const loacation=useLocation()
  const [registerNumber,setRegisterNumber]=useState("")
const naviagtion=useNavigate()

useEffect(()=>{

     function getRegister(){
      const cookies = Object.fromEntries(
          document.cookie.split("; ").map(c => c.split("="))
        );
        if(!cookies.registerNumber&&!cookies.token){
         return naviagtion("/",{replace:true})
        }
        const registerNumber = cookies.registerNumber;
        setRegisterNumber(registerNumber)
     }
     getRegister()
})

  const handleStartTest = async () => {
    setLoading(true);
    try {
 const query = new URLSearchParams(location.search);
      const testId = query.get("testId")
      
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions/test?testId=${testId}`
      );
      setTestData(res.data);
      setShowInstructions(false);
    } catch (error) {
      console.error("Failed to fetch test data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (showInstructions) {
    return (
      <div className="w-full h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl max-w-3xl p-10 mx-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Test Instructions</h2>
          <ul className="text-left list-disc list-inside text-gray-700 mb-8 space-y-2">
            <li>Read all questions carefully.</li>
            <li>Do not refresh the page during the test.</li>
            <li>Each question has a time limit.</li>
            <li>You can submit code or MCQs using the provided interface.</li>
            <li>Ensure a stable internet connection.</li>
          </ul>
          <button
            onClick={handleStartTest}
            disabled={loading}
            className={`px-8 py-3 rounded-xl text-white font-semibold text-lg transition-colors duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Loading Test..." : "Start Test"}
          </button>
        </div>
      </div>
    );
  }

  return testData ? (
    <CodingTestPlatform testdata={testData} registerNumber={registerNumber} />
  ) : (
    <div className="w-full h-screen flex items-center justify-center text-gray-700 text-lg">
      Failed to load test. Try refreshing.
    </div>
  );
}
