import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'; // Make sure to import the CSS file

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
        </li>
        <li>
          <NavLink to="/habits" className={({ isActive }) => (isActive ? 'active' : '')}>Habits</NavLink>
        </li>
        <li>
          <NavLink to="/timetable" className={({ isActive }) => (isActive ? 'active' : '')}>Timetable</NavLink>
        </li>
        <li>
          <NavLink to="/todo" className={({ isActive }) => (isActive ? 'active' : '')}>To-Do</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
