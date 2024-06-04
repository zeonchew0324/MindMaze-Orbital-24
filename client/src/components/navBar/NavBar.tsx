import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

//added navbar for home page
function NavBar() {
    return (
        <nav >
            <ul className='navbar'>
                <li><Link to = "/profile">Profile</Link></li>
                <li><Link to = "/home">Dashboard</Link></li>
                <li><Link to = "/habits">Habits</Link></li>
                <li><Link to = "/timetable">Timetable</Link></li>
                <li><Link to = "/todo">To-do</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;