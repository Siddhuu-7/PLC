
import { Play,Clock,CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function TestCard({ quiz }) {
  if (!quiz) return null;
  const status = quiz.status || "available"; 

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-gray-800">{quiz.testName}</h4>
        {status === "completed" && <CheckCircle className="w-5 h-5 text-green-600" />}
        {status === "available" && <Play className="w-5 h-5 text-blue-600" />}
        {status === "upcoming" && <Clock className="w-5 h-5 text-orange-600" />}
      </div>
      <p className="text-sm text-gray-600 mb-2">{quiz.testSubject}</p>
      <div className="flex justify-between text-xs text-gray-500 mb-3">
        <span>{quiz.questions} questions</span>
      </div>
      <button
        className={`w-full py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
          status === "available"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : status === "completed"
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
     onClick={()=>  window.open(`/mcqs?testId=${quiz.testId}`, "_blank")}

      >
        {status === "available" && "START NOW"}
        {status === "completed" && "COMPLETED"}
        {status === "upcoming" && "COMING SOON"}
      </button>
    </div>
  );
}
