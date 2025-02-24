import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

const LeaveList = () => {
  return (
    <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by name"
              className="px-4 py-0.5 border"
            //   onChange={handleFilter}
            />
            <Link
              to="/employee-dashboard/add-leave"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Leave
            </Link>
          </div>
        </div>
  )
}

export default LeaveList
