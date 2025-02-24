import React from 'react'
import { useAuth } from '../context/authContext'
import SideBar from '../components/EmployeeDashboard/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/dashboard/NavBar'

function EmployeeDashboard() {
  return (
    <div className='flex'>
      <SideBar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen w-full'>
        <NavBar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard
