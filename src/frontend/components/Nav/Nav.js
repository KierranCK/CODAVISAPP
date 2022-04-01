import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
  return (
    
//     <div className='nav'>

//         <Link to="/dashboard">
//             <div className='nav-item'>Dashboard</div>
//         </Link>

//         <Link to="/report">
//             <div className='nav-item'>Report</div>
//         </Link>

//         <Link to="/about">
//             <div className='nav-item'>About</div>
//         </Link>


//     </div>
//   

<ul className='nav flex-column'>
    <li className='nav-item'>
        <NavLink to="/dashboard" className='nav-link' activeclassname="active">
        {/* <span class="material-icons-outlined">analytics</span> */}
        Dashboard
        </NavLink>
    </li>
    <li className='nav-item'>
        <NavLink to="/report" className='nav-link' activeclassname="active">
        {/* <span class="material-icons-outlined ">summarize</span> */}
            Report
            </NavLink>
    </li>
    <li className='nav-item'>
        <NavLink to="/about" className='nav-link' activeclassname="active">
        {/* <span class="material-icons-outlined">info</span> */}
            About
            </NavLink>
    </li>
</ul>
  )
}

export default Nav