import React, { useState } from "react";

export default function UrlCard({ url }) {
  const [loading, setLoading] = useState(false);

  const handleSendAll = async () => {
    if (!url) return;

    setLoading(true);

    try {
      
      await navigator.clipboard.writeText(url);

     
      setTimeout(() => {
        alert("📌 Coming soon... (URL copied to clipboard)");
        console.log("Copied:", url);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("❌ Failed to copy URL");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">URL to Send</h2>
      <div className="flex items-center gap-2">
        {/* Display URL */}
        <div className="flex-1 px-3 py-2 border rounded-xl bg-gray-50 text-gray-700 truncate">
          {url || "No URL provided"}
        </div>

        {/* Send All button */}
        <button
          onClick={handleSendAll}
          disabled={loading || !url}
          className={`px-4 py-2 flex items-center justify-center gap-2 font-medium rounded-xl shadow transition
            ${loading || !url
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"}
          `}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Sending...
            </>
          ) : (
            "Send All"
          )}
        </button>
      </div>
    </div>
  );
}
