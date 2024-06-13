import React from "react";

interface WeeklyBarProps {
    selectedDay: string;
    setSelectedDay: (day: string) => void;
}

const sevenDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyBar: React.FC<WeeklyBarProps> = ({ selectedDay, setSelectedDay }) => {
    return (
        <div className="flex justify-center items-center rounded-full p-2 bg-gray-400 fixed top-[100px] left-20 right-20">
            {sevenDays.map((day) => (
                <button
                    key={day}
                    className={`mx-1 px-4 py-2 rounded-full hover:bg-zinc-600 ${selectedDay === day ? 'bg-yellow-950 text-white font-bold' : 'bg-white text-black border'}`}
                    onClick={() => setSelectedDay(day)}
                >
                    {day}
                </button>
            ))}
        </div>
    );
}

export default WeeklyBar;