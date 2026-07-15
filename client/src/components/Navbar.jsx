import { FaBuilding, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <div className="flex items-center gap-3">
        <FaBuilding className="text-blue-600 text-3xl" />

        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            Society Maintenance Tracker
          </h1>

          <p className="text-gray-500 text-sm">
            Complaint Management System
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">

        <div className="text-right">

          <h2 className="font-semibold">
            Welcome, {user?.name}
          </h2>

          <p className="text-gray-500 text-sm">
            {user?.role}
          </p>

        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}