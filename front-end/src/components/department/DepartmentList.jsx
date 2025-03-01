import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]) 

  const onDepartmentDelete =  () => {
    fetchDepartment()
  };

  const fetchDepartment = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/department",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));
        setDepartments(data);
        setFilteredDepartments(data); 
      }
    } catch (err) {
      if (err.response && !err.response.data.success) {
        alert(err.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredDepartments(records)
  };

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 rounded-full animate-spin border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold text-teal-500 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by name"
              className="px-4 py-0.5 border"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={filteredDepartments} pagination/>
          </div>
        </div>
      )}
    </>
  );
};

export default Department;
