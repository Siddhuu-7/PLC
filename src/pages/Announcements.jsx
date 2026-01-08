import axios from "axios";
import React, { useEffect, useState } from "react";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([
 
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newBy, setNewBy] = useState("");

  useEffect(() => {
  async function getannouncement() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getannouncement`);
      if (res.data) {
        setAnnouncements(res.data.data); 
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  }
  getannouncement();
}, []);

const handleAddAnnouncement = async (e) => {
  e.preventDefault();
  if (!newTitle.trim() || !newTime.trim() || !newBy.trim()) return;

  try {
    const newAnnouncement = {
      title: newTitle,
      time: newTime,
      by: newBy,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/announcement`,
      newAnnouncement
    );

    if (res.data) {
      setAnnouncements([res.data, ...announcements]);
      setNewTitle("");
      setNewTime("");
      setNewBy("");
    }
  } catch (error) {
    console.error("Error adding announcement:", error);
  }
};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        📢 Announcements
      </h2>

      {/* Form */}
      <form
        onSubmit={handleAddAnnouncement}
        className="bg-white shadow-md rounded-lg p-5 mb-8"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Announcement Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="By"
            value={newBy}
            onChange={(e) => setNewBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
          >
            ➕ Add Announcement
          </button>
        </div>
      </form>

      {/* Announcements list */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <p className="text-center text-gray-500">No announcements yet.</p>
        ) : (
          announcements.map((ann, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {ann.title}
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Time:</span> {ann.time}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">By:</span> {ann.by}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
