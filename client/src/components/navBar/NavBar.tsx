import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-black bg-opacity-40 py-5 shadow-lg flex justify-center items-center fixed w-full top-0 left-0 z-50">
      <ul className="flex list-none m-0 p-0 w-full hover: ">
        <li className="flex-1 text-center">
          <NavLink 
            to="/home" 
            className={({ isActive }) => `text-black no-underline py-2.5 text-xl rounded-lg transition-colors duration-300 font-extrabold relative block ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
        </li>
        <li className="flex-1 text-center">
          <NavLink 
            to="/habits" 
            className={({ isActive }) => `text-black no-underline py-2.5 text-xl rounded-lg transition-colors duration-300 font-extrabold relative block ${isActive ? 'active' : ''}`}
          >
            Habits
          </NavLink>
        </li>
        <li className="flex-1 text-center">
          <NavLink 
            to="/timetable" 
            className={({ isActive }) => `text-black no-underline py-2.5 text-xl rounded-lg transition-colors duration-300 font-extrabold relative block ${isActive ? 'active' : ''}`}
          >
            Timetable
          </NavLink>
        </li>
        <li className="flex-1 text-center">
          <NavLink 
            to="/todo" 
            className={({ isActive }) => `text-black no-underline py-2.5 text-xl rounded-lg transition-colors duration-300 font-extrabold relative block ${isActive ? 'active' : ''}`}
          >
            To-Do
          </NavLink>
        </li>
        <li className="flex-1 text-center">
          <NavLink 
            to="/profile" 
            className={({ isActive }) => `text-black no-underline py-2.5 text-xl rounded-lg transition-colors duration-300 font-extrabold relative block ${isActive ? 'active' : ''}`}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
