import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Logout() {

  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.clear();
    // navigate('/');
    window.location.reload();
  }
  return (
    <div className='w-24 text-start px-2 py-1 flex-col border absolute top-16 bg-gray-900 right-4 cursor-pointer'>
      <li>Profile</li>
      <li>Setting</li>
      <hr className='my-1'/>
      <li onClick={handleLogout} className='text-red-500'>Logout</li>
    </div>
  )
}

export default Logout
