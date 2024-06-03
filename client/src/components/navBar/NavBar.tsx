import React from 'react';
import {Link} from 'react-router-dom';

//added navbar for home page
 //add navigation bar on top, profile; dashboard(main); habits; timetable; to-do
function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to = "/profile">Profile</Link></li>
                <li><Link to = "/home">Dashboard</Link></li>
                <li><Link to = "/habits">Habits</Link></li>
                <li><Link to = "/timetable">Timetable</Link></li>
                <li><Link to = "/to-do">To-do</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;