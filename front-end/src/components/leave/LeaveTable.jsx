import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState(null);
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
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        console.log(data);
        setLeaves(data);
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

  return (
    <>
      {leaves ? (
        <div className="p-6 bg-white h-screen shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Manage Leaves</h3>
          </div>

          {/* Search and Action Leave Button */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search by Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              //   onChange={handleFilter}
            />
            <div className="space-x-3">
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">
                Pending
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">
                Approved
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-5">
            <DataTable columns={columns} data={leaves} pagination />
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
