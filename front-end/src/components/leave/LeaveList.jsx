import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  let sno = 1;

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
        setFilteredLeaves(response.data.leaves);
      }
    } catch (err) {
      if (err.response && !err.response.data.success) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleFilter = async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRecords = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(searchTerm)
    );
    setFilteredLeaves(filteredRecords);
  };
  

  return (
    <div className="p-6 bg-white h-screen shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800">Manage Leaves</h3>
      </div>

      {/* Search and Add New Leave Button */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by status"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          onChange={handleFilter}
        />
        <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all"
        >
          Add New Leave
        </Link>
      </div>

      {/* Table */}
      {filteredLeaves && filteredLeaves.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">SNO</th>
                <th className="py-3 px-6 text-left">Leave Type</th>
                <th className="py-3 px-6 text-left">From</th>
                <th className="py-3 px-6 text-left">To</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Applied Date</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {leaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <td className="py-4 px-6">{sno++}</td>
                  <td className="py-4 px-6">{leave.leaveType}</td>
                  <td className="py-4 px-6">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">{leave.reason}</td>
                  <td className="py-4 px-6">
                    {new Date(leave.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center p-6 mt-5 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400 mb-4 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 text-lg font-semibold">
            No Records Found
          </p>
        </div>
      )}
    </div>
  );
};

export default LeaveList;
