import axios from "axios";
import React from "react";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "160px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "160px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "120px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (status, employeeId) => {
    const response = await axios.put(
      `http://localhost:5000/api/attendance/update/${employeeId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      statusChange();
    }
  };
  return (
    <div>
      {status == null ? (
        <div className="flex space-x-4 p-1">
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
            onClick={() => markEmployee("Present", employeeId)}
          >
            Present
          </button>
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
            onClick={() => markEmployee("Absent", employeeId)}
          >
            Absent
          </button>
          <button
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
            onClick={() => markEmployee("Sick", employeeId)}
          >
            Sick
          </button>
          <button
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
            onClick={() => markEmployee("Leave", employeeId)}
          >
            Leave
          </button>
        </div>
      ) : (
        <span
          className={`px-6 py-3 rounded-full text-base font-semibold ${
            status === "Present"
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : status === "Absent"
              ? "bg-red-100 text-red-700 hover:bg-red-200"
              : status === "Sick"
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          } transition-all duration-300`}
        >
          {status}
        </span>
      )}
    </div>
  );
};
