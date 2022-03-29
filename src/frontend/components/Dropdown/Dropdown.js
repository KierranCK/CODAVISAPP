import React from 'react'
import { Link } from 'react-router-dom'
import './Dropdown.css'

const Dropdown = ({label, items}) => {
  return (

    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      {label}
    </button>
    <ul class="dropdown-menu">
      {items.map(item => {
        <li><a class="dropdown-item" href="#">{item}</a></li>
      })}
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>
  )
}

export default Button