import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (err) {
        if (err.response && !err.response.data.success) {
          alert(err.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, []);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Employee Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hình ảnh đại diện */}
            <div className="flex justify-center items-center">
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                alt="Profile"
                className="rounded-full border-4 border-white shadow-lg w-72 h-72 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Thông tin chi tiết */}
            <div className="space-y-6">
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">Name:</p>
                <p className="text-lg text-gray-900">{employee.userId.name}</p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">
                  Employee ID:
                </p>
                <p className="text-lg text-gray-900">{employee.employeeId}</p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">
                  Date of birth:
                </p>
                <p className="text-lg text-gray-900">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">Gender:</p>
                <p className="text-lg text-gray-900">{employee.gender}</p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">
                  Department:
                </p>
                <p className="text-lg text-gray-900">
                  {employee.department.dep_name}
                </p>
              </div>
              <div className="flex space-x-4">
                <p className="text-lg font-semibold text-gray-700">
                  Marital status:
                </p>
                <p className="text-lg text-gray-900">
                  {employee.maritalStatus}
                </p>
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

export default ViewEmployee;
