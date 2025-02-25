import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCog,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
    const {user} = useAuth()
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-xl">
      {/* Header */}
      <div className="bg-teal-600 h-16 flex items-center justify-center shadow-md">
        <h3 className="text-2xl text-center font-pacific font-bold">EMS</h3>
      </div>

      {/* NavLinks */}
      <div className="space-y-3 mt-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : "hover:bg-teal-700"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
          end
        >
          <FaTachometerAlt className="text-xl" />
          <span className="text-lg">Dashboard</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : "hover:bg-teal-700"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
        >
          <FaUsers className="text-xl" />
          <span className="text-lg">My Profile</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : "hover:bg-teal-700"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
        >
          <FaCalendarAlt className="text-xl" />
          <span className="text-lg">Leaves</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : "hover:bg-teal-700"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
        >
          <FaMoneyBillWave className="text-xl" />
          <span className="text-lg">Salary</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : "hover:bg-teal-700"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
        >
          <FaCog className="text-xl" />
          <span className="text-lg">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
