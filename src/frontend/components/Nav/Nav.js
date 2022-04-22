import React from "react";
import { NavLink } from "react-router-dom";
import codavisLogo from "../../images/CODAVIS-logo-white.png";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="nav">
      <NavLink to="/dashboard" className="nav-logo-link">
        <img
          src={codavisLogo}
          alt="codavis-logo"
          className="codavis-nav-logo"
        />
      </NavLink>
      <ul className="nav-list flex-column">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className="nav-link"
            activeclassname="active"
          >
            <span class="material-icons-outlined">analytics</span>
            <p className="nav-label">Dashboard</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/report" className="nav-link" activeclassname="active">
            <span class="material-icons-outlined ">summarize</span>

            <p className="nav-label">Report</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" activeclassname="active">
            <span class="material-icons-outlined">info</span>

            <p className="nav-label">About</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
