import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            image: (
              <img
                src={`http://localhost:5000/${emp.userId.profileImage}`}
                alt="Profile"
                className="w-12 h-12 m-1 rounded-full object-cover border-1 border-black shadow-lg hover:scale-90 transition-transform duration-300"
              />
            ),
            action: <EmployeeButtons _id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data)
        }
      } catch (err) {
        if (err.response && !err.response.data.success) {
          alert(err.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployees(records)
  }

  return (
    <>
      {empLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by name"
              className="px-4 py-0.5 border"
              onChange={handleFilter}
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Employee
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={filteredEmployees} pagination/>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeList;
