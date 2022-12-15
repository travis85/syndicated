import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='bg-gray-700 h-40 p-8'>
      <Link to={'/RegisterPage'} className='no-underline text-white'>Become A partner</Link><br></br>
      <Link to={'/SignIn'} className='no-underline text-white'>Sign In</Link>

    </div>
  )
}
