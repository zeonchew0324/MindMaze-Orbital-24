import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-black bg-opacity-40 py-4 shadow-lg flex justify-center items-center fixed w-full top-0 left-0 z-50 transition duration-300 ease-in-out">
      <ul className="flex list-none m-0 p-0 w-full">
        <li className="flex-1 text-center border-r-4 border-stone-800">
          <NavLink 
            to="/home" 
            className={({ isActive }) => 
              `text-black no-underline py-2.5 text-xl rounded-lg transition duration-300 ease-in-out font-extrabold relative block ${
                isActive ? 'active' : ''
              } hover:bg-black hover:bg-opacity-20 hover:text-white`
            }
          >
            Home
          </NavLink>
        </li>
        <li className="flex-1 text-center border-r-4 border-stone-800">
          <NavLink 
            to="/habits" 
            className={({ isActive }) => 
              `text-black no-underline py-2.5 text-xl rounded-lg transition duration-300 ease-in-out font-extrabold relative block ${
                isActive ? 'active' : ''
              } hover:bg-black hover:bg-opacity-20 hover:text-white`
            }
          >
            Habits
          </NavLink>
        </li>
        <li className="flex-1 text-center border-r-4 border-stone-800">
          <NavLink 
            to="/timetable" 
            className={({ isActive }) => 
              `text-black no-underline py-2.5 text-xl rounded-lg transition duration-300 ease-in-out font-extrabold relative block ${
                isActive ? 'active' : ''
              } hover:bg-black hover:bg-opacity-20 hover:text-white`
            }
          >
            Timetable
          </NavLink>
        </li>
        <li className="flex-1 text-center border-r-4 border-stone-800">
          <NavLink 
            to="/todo" 
            className={({ isActive }) => 
              `text-black no-underline py-2.5 text-xl rounded-lg transition duration-300 ease-in-out font-extrabold relative block ${
                isActive ? 'active' : ''
              } hover:bg-black hover:bg-opacity-20 hover:text-white`
            }
          >
            To-Do
          </NavLink>
        </li>
        <li className="flex-1 text-center ">
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `text-black no-underline py-2.5 text-xl rounded-lg transition duration-300 ease-in-out font-extrabold relative block ${
                isActive ? 'active' : ''
              } hover:bg-black hover:bg-opacity-20 hover:text-white`
            }
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
