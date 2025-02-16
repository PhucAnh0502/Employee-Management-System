import React from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUser } from 'react-icons/fa'

const AdminSummary = () => {
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
          number={12}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={5}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Pay"
          number={2500}
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
            number={5}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={2}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={4}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={1}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminSummary
