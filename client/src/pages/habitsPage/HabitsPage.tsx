import React, { useEffect, useState } from "react";
import WeeklyBar from "../../components/habits/WeeklyBar";
import NavBar from "../../components/navBar/NavBar";
import HabitsList from '../../components/habits/HabitsList';
import { useHabits } from '../../contexts/HabitsProvider';


const HabitsPage: React.FC = () => { 
    const sevenDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const[selectedDay, setSelectedDay] = useState<string>(sevenDays[new Date().getDay()]);
    const { habits } = useHabits();
    const filteredHabits = habits.filter((habit) => habit.day === selectedDay);

    useEffect(() => {setSelectedDay(sevenDays[new Date().getDay()]);},[]);


    return (
        
        <div>
            <NavBar />
            <WeeklyBar selectedDay = {selectedDay} setSelectedDay={setSelectedDay}/>
            <HabitsList habits={filteredHabits} />
        </div>
        
    )
}

export default HabitsPage;
