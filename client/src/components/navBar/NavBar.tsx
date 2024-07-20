import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, CheckSquare, User, List } from 'lucide-react';
import './NavBar.css';

const NavBar = () => {
  const navItems = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/habits", icon: List, label: "Habits" },
    { to: "/timetable", icon: Calendar, label: "Timetable" },
    { to: "/todo", icon: CheckSquare, label: "To-Do" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50 pl-[80px] pr-[80px] bg-opacity-65 backdrop-filter backdrop-blur-lg">
      <ul className="flex justify-between items-center">
        {navItems.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-orange-600'
                    : 'text-gray-500 hover:text-orange-600'
                }`
              }
            >
              <Icon className="w-6 h-6 mb-1" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;