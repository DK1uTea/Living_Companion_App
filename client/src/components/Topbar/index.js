import React from 'react'
import { Link } from 'react-router-dom'


export default function Topbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/login-and-register'>Home</Link>
        </li>
        {/* <li>
          <Link to='/user/register'>Register</Link>
        </li> */}
      </ul>
    </div>
  )
}
