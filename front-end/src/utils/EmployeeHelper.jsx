import axios from "axios";
import { useNavigate } from "react-router-dom";

export const fetchDepartment = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (err) {
    if (err.response && !err.response.data.success) {
      alert(err.response.data.error);
    }
  }
  return departments;
};

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "160px",
  },
  {
    name: "Image",
    selector: (row) => row.image,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "150px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center : "true"
  },
];

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <button
        className="ml-1 flex-1 px-5 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>

      <button className="flex-1 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md">
        Edit
      </button>

      <button className="flex-1 px-5 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md">
        Salary
      </button>

      <button className="mr-1 flex-1 px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md">
        Leave
      </button>
    </div>
  );
};
