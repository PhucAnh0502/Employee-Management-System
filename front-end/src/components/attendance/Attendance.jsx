import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const statusChange = () => {
    fetchAttendance();
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.attendance.map((att) => ({
          employeeId: att.employeeId.employeeId,
          sno: sno++,
          department: att.employeeId.department.dep_name,
          name: att.employeeId.userId.name,
          action: (
            <AttendanceHelper
              status={att.status}
              employeeId={att.employeeId.employeeId}
              statusChange={statusChange}
            />
          ),
        }));
        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (err) {
      if (err.response && !err.response.data.success) {
        alert(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const records = attendance.filter((att) =>
      att.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredAttendance(records);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-teal-500 rounded-full animate-spin border-t-transparent mb-4"></div>
            <p className="text-lg font-semibold text-teal-500 animate-pulse">
              Loading...
            </p>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800">
              Manage Attendance
            </h3>
          </div>

          {/* Search and Actions */}
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              placeholder="Search by name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all w-64"
              onChange={handleFilter}
            />
            <p className="text-lg font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
              Mark Employees for{" "}
              <span className="text-teal-600 font-bold">
                {new Date().toISOString().split("T")[0]}
              </span>
            </p>
            <Link
              to="/admin-dashboard/attendance-report"
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all"
            >
              Attendance Report
            </Link>
          </div>

          {/* DataTable */}
          <div className="mt-8">
            <DataTable
              columns={columns}
              data={filteredAttendance}
              pagination
              className="border border-gray-200 rounded-lg overflow-hidden"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;
