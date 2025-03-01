import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import axios from 'axios'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUser } from 'react-icons/fa'

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('http://localhost:5000/api/dashboard/summary', {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(summary)
        setSummary(summary.data)
      } catch (err) {
        if(err.response){
          alert(err.response.data.error)
        }
        console.log(err.message)
      }
    }
    fetchSummary()
  }, [])

  if(!summary){
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 rounded-full animate-spin border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold text-teal-500 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Dashboard Overview */}
      <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Dashboard Overview
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 p-4 bg-gray-50 rounded-lg">
        <SummaryCard
          icon={<FaUser />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Pay"
          number={summary.totalSalary}
          color="bg-red-600"
        />
      </div>

      {/* Leave Details */}
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h4 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Leave Details
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminSummary
