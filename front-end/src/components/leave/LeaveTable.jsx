import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days: Math.ceil(
            (new Date(leave.endDate) - new Date(leave.startDate)) /
              (1000 * 60 * 60 * 24)
          ),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (err) {
      if (err.response && !err.response.data.success) {
        console.log(err);
        alert(err.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-8 bg-white min-h-screen shadow-lg">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-800">Manage Leaves</h3>
          </div>

          {/* Search and Action Leave Button */}
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              placeholder="Search by Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all w-64"
              onChange={filterByInput}
            />
            <div className="space-x-4">
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          {/* DataTable */}
          <div className="mt-8">
            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
              className="border border-gray-200 rounded-lg overflow-hidden"
            />
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

export default LeaveTable;
