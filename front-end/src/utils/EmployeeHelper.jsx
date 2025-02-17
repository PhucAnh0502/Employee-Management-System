import axios from "axios";

export const fetchDepartment = async () => {
    let departments
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
        departments = response.data.departments
      }
    } catch (err) {
      if (err.response && !err.response.data.success) {
        alert(err.response.data.error);
      }
    }
    return departments
  };