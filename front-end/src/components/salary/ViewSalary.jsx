import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (err) {
      if (err.response && !err.response.data.success) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const filteredRecords = salaries.filter((leave) => {
      leave.employeeId
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    });
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
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
            <h3 className="text-2xl font-bold">Salary History</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by name"
              className="px-4 py-0.5 border"
              onChange={filterSalaries}
            />
          </div>

          {filteredSalaries && filteredSalaries.length > 0 ? (
            <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">SNO</th>
                  <th className="py-3 px-6 text-left">Emp ID</th>
                  <th className="py-3 px-6 text-left">Salary</th>
                  <th className="py-3 px-6 text-left">Allowance</th>
                  <th className="py-3 px-6 text-left">Deduction</th>
                  <th className="py-3 px-6 text-left">Total</th>
                  <th className="py-3 px-6 text-left">Pay Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredSalaries.map((salary, index) => (
                  <tr
                    key={salary.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6">{sno++}</td>
                    <td className="py-3 px-6">{salary.employeeId.employeeId}</td>
                    <td className="py-3 px-6">{salary.basicSalary}</td>
                    <td className="py-3 px-6">{salary.allowances}</td>
                    <td className="py-3 px-6">{salary.deductions}</td>
                    <td className="py-3 px-6">{salary.netSalary}</td>
                    <td className="py-3 px-6">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-semibold text-teal-500 animate-pulse">
                  Loading...
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewSalary;
