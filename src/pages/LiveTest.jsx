import axios from "axios";
import React, { useEffect, useState } from "react";
import CodingTestPlatform from "../components/CodingTestPlatform";
import { useLocation, useNavigate } from "react-router-dom";

export default function LiveTest() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [registerNumber, setRegisterNumber] = useState("");
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [testStartTime, setTestStartTime] = useState(null);

  // Get registerNumber from cookies
  useEffect(() => {
    function getRegister() {
      const cookies = Object.fromEntries(
        document.cookie.split("; ").map((c) => c.split("="))
      );
      if (!cookies.registerNumber && !cookies.token) {
        return navigate("/", { replace: true });
      }
      setRegisterNumber(cookies.registerNumber);
    }
    getRegister();
  }, [navigate]);

  // Fetch test details (including testStartTime)
  useEffect(() => {
    async function getDetails() {
      const query = new URLSearchParams(location.search);
      const testDetails = query.get("testDetails");

      if (!testDetails) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/questions/testDetails?testDetails=${testDetails}`
        );

        const startStr = res.data.data.testStartTime; 
        console.log(res.data.data.testStartTime)
        if (startStr) {
          const [datePart, timePart] = startStr.split(";");
          const [year, month, day] = datePart.split("-").map(Number);
          const [hour, minute] = timePart.split(":").map(Number);

          const startDate = new Date(year, month - 1, day, hour, minute);
          setTestStartTime(startDate);
        }
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    }
    getDetails();
  }, [location.search]);

  useEffect(() => {
    if (!testStartTime) return;

    const timer = setInterval(() => {
      const now = new Date();
      const diff = testStartTime - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft("00:00:00");
        setIsReady(true);
      } else {
        const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
        const minutes = String(
          Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0");
        const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(
          2,
          "0"
        );
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [testStartTime]);

  // Start Test
  const handleStartTest = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(location.search);
      const testId = query.get("testId");

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
      <div className="w-full h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-10">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">
            Coding Test Instructions
          </h2>

          {/* Test Start Time */}
          <div className="bg-indigo-100 border-l-4 border-indigo-500 text-indigo-700 p-4 mb-8 rounded text-center">
            <p className="text-lg font-semibold">
              ⏰ Test Start Time:{" "}
              <span className="font-bold">
                {testStartTime
                  ? testStartTime.toLocaleString()
                  : "Loading..."}
              </span>
            </p>
            {!isReady && timeLeft && (
              <p className="text-md text-gray-600 mt-2">
                Countdown:{" "}
                <span className="font-mono text-xl">{timeLeft}</span>
              </p>
            )}
          </div>

          {/* Instructions */}
          <ul className="text-left list-disc list-inside text-gray-700 mb-10 space-y-3 text-lg">
            <li>Read all questions carefully before answering.</li>
            <li>Do not refresh or close the page during the test.</li>
            <li>Each coding question may have time limits or constraints.</li>
            <li>You can submit solutions for coding and MCQ questions.</li>
            <li>Ensure a stable internet connection throughout the test.</li>
            <li>Once you start, the timer will begin and cannot be paused.</li>
          </ul>

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartTest}
              disabled={!isReady || loading}
              className={`px-10 py-4 rounded-xl text-white font-bold text-lg tracking-wide transition-transform duration-300 ${
                !isReady || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105"
              }`}
            >
              {loading
                ? "Loading Test..."
                : isReady
                ? "Start Test"
                : "Not Available Yet"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return testData ? (
    <CodingTestPlatform
      testdata={testData}
      registerNumber={registerNumber}
    />
  ) : (
    <div className="w-full h-screen flex items-center justify-center text-gray-700 text-lg">
      Failed to load test. Try refreshing.
    </div>
  );
}
