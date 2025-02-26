import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LeaveDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (err) {
        if (err.response && !err.response.data.success) {
          alert(err.response.data.error);
        }
      }
    };

    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
        const response = await axios.put(
          `http://localhost:5000/api/leave/${id}`,
          {status},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          navigate('/admin-dashboard/leaves')
        }
      } catch (err) {
        if (err.response && !err.response.data.success) {
          alert(err.response.data.error);
        }
      }
  }

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Leave Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hình ảnh đại diện */}
            <div className="flex justify-center items-center">
              <img
                src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                alt="Profile"
                className="rounded-full border-4 border-white shadow-lg w-72 h-72 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Thông tin chi tiết */}
            <div className="space-y-6">
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">Name:</p>
                <p className="text-lg text-gray-900">
                  {leave.employeeId.userId.name}
                </p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">
                  Employee ID:
                </p>
                <p className="text-lg text-gray-900">
                  {leave.employeeId.employeeId}
                </p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">
                  Leave Type:
                </p>
                <p className="text-lg text-gray-900">{leave.leaveType}</p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">Reason:</p>
                <p className="text-lg text-gray-900">{leave.reason}</p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">
                  Department:
                </p>
                <p className="text-lg text-gray-900">
                  {leave.employeeId.department.dep_name}
                </p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">
                  Start Date:
                </p>
                <p className="text-lg text-gray-900">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">End Date:</p>
                <p className="text-lg text-gray-900">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">
                  {leave.status === "Pending" ? "Action:" : "Status"}
                </p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="text-lg text-gray-900">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-teal-500 rounded-full animate-spin border-t-transparent mb-4"></div>
            <p className="text-lg font-semibold text-teal-500 animate-pulse">
              Loading...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveDetail;
