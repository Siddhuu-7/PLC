import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SessionsCard() {
  const [todaySession, setTodaySession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getannouncement() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/gettodayannouncement`
        );
        if (res.data?.data) {
          setTodaySession(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    }
    getannouncement();
  }, []);

  return (
    <>
      {loading ? (
        <SessionsCardSkeleton />
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-6 font-serif italic text-gray-800">
            📅 Today&apos;s Session
          </h3>

          {todaySession ? (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 shadow">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                {todaySession.title}
              </p>
              <p className="text-md text-gray-700 mb-1">
                ⏰ <span className="font-medium">{todaySession.time}</span>
              </p>
              <p className="text-sm text-gray-600 italic">
                👤 By {todaySession.by}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No session scheduled for today.</p>
          )}
        </div>
      )}
    </>
  );
}

function SessionsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse text-center">
      <h3 className="text-xl font-bold mb-6 font-serif italic text-gray-300">
        📅 Today&apos;s Session
      </h3>
      <div className="bg-gray-100 rounded-lg p-6 shadow">
        <div className="h-5 w-40 bg-gray-300 rounded mx-auto mb-3"></div>
        <div className="h-4 w-28 bg-gray-200 rounded mx-auto mb-2"></div>
        <div className="h-3 w-24 bg-gray-200 rounded mx-auto"></div>
      </div>
    </div>
  );
}
