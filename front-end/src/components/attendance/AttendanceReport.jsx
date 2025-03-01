import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFiltered, setDateFiltered] = useState();
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFiltered) {
        query.append("date", dateFiltered);
      }
      const response = await axios.get(
        `http://localhost:5000/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        if (skip == 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({
            ...prevData,
            ...response.data.groupData,
          }));
        }
      }
      setLoading(false);
    } catch (err) {
      if (err.response && !err.response.data.success) {
        alert(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFiltered]);

  const handleLoadmore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  return (
    <div className="min-h-screen p-10 bg-white ">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Attendance Report
        </h2>

        {/* Filter By Date */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Filter By Date
          </h2>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            onChange={(e) => {
              setDateFiltered(e.target.value);
              setSkip(0);
            }}
          />
        </div>
      </div>
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
        Object.entries(report).map(([date, record]) => (
          <div key={date} className="mt-6 border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{date}</h2>
            <table className="w-full mt-4 border-collapse shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    S No
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Employee ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {record.map((data, i) => (
                  <tr
                    key={data.employeeId}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">{i + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {data.employeeId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {data.employeeName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {data.departmentName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {data.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
      <button
        className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md"
        onClick={handleLoadmore}
      >
        Load More
      </button>
    </div>
  );
};

export default AttendanceReport;
