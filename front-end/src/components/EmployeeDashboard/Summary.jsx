import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const Summary = () => {
    const {user} = useAuth()
  return (
    <div className="rounded-lg flex bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 m-4">
      <div
        className={`text-3xl flex justify-center items-center text-white px-6 py-4 rounded-l-lg bg-teal-600`}
      >
        <FaUser />
      </div>
      <div className="pl-4 py-3 flex flex-col justify-center">
        <p className="text-lg font-semibold text-gray-700">Welcome Back</p>
        <p className="text-2xl font-bold text-gray-900">{user.name}</p>
      </div>
    </div>
  )
}

export default Summary
