import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password Not Matched");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:5000/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate("/admin-dashboard/employees");
          setError("");
        }
      } catch (err) {
        if (err.response && !err.response.data.success) {
          setError(err.message);
        }
      }
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
        Change Password
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter Old Password"
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
