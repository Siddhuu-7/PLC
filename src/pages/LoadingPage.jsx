
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Loading() {
    const navigation=useNavigate()
      useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_backend_Url}/api/users/autologin`,
          { withCredentials: true }
        );

        if (res.data?.msg) {
          navigation("/home");
        } else {
          navigation("/landingpage");
        }
      } catch (error) {
        console.error("Auto login failed:", error.message);
        navigation("/landingpage");
      }
    };

    checkLogin();
  }, [navigation]);
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-center text-gray-700 font-semibold tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default Loading;
