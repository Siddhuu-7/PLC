import axios from "axios";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async() => {
   await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/clearcookie`,{
        withCredentials:true
    }
   )
    navigate("/", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 px-2 py-1 border border-red-300 rounded-lg hover:bg-red-50 transition"
    >
      <LogOut size={16} />
      <span>Logout</span>
    </button>
  );
}
