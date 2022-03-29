import React from 'react'
import { Link } from 'react-router-dom'
import './Button.css'

const Button = ({location, label}) => {
  return (

    <button className="btn btn-warning btn-sm">
        <Link to={location}>
            {label}
        </Link>
    </button>
  )
}

export default Button