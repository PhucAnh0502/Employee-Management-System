import React from 'react'
import { useAuth } from '../../context/authContext'
import { FaSignOutAlt } from 'react-icons/fa';

const NavBar = () => {
    const {user} = useAuth()
  return (
    <div className="flex items-center text-white justify-between h-16 bg-teal-600 px-6 shadow-md">
      <p className="text-lg font-semibold">Welcome {user.name}</p>
      <button className="px-6 py-2 bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors duration-300 flex items-center">
        <FaSignOutAlt className="mr-2" />
        Log out
      </button>
    </div>
  );
}

export default NavBar
