import React from "react";

interface WeeklyBarProps {
    selectedDay: string;
    setSelectedDay: (day : string) => void;
}

const sevenDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


const WeeklyBar : React.FC<WeeklyBarProps> = ({selectedDay, setSelectedDay}) => {
    return (
        <div>
            {sevenDays.map((day) => (
            <button
            key = {day}
            className = {`p-2 ${selectedDay === day ? 'bg-blue-500 text-white' : 'bg-white'}`} 
            onClick = {() => setSelectedDay(day)}
            >
                {day}
            </button>
            ))}
        </div>

    );
}

export default WeeklyBar;