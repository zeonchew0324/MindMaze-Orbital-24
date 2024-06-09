import React, { useEffect, useState } from "react";
import WeeklyBar from "../../components/habits/WeeklyBar";
import NavBar from "../../components/navBar/NavBar";


const HabitsPage: React.FC = () => { 
    const sevenDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const[selectedDay, setSelectedDay] = useState<string>(sevenDays[new Date().getDay()]);

    useEffect(() => {setSelectedDay(sevenDays[new Date().getDay()]);},[]);


    return (
        
        <div>
            <NavBar />
            <WeeklyBar selectedDay = {selectedDay} setSelectedDay={setSelectedDay}/>
        </div>
        
    )
}

export default HabitsPage;
