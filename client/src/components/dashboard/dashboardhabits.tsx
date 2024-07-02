import React from 'react';
import { useHabits } from '../../contexts/HabitsProvider';
import { sevenDays } from '../../utils/habits';
import { useNavigate } from 'react-router-dom';

const DashboardHabits: React.FC = () => {
    const navigate = useNavigate();
    const { habits } = useHabits();
    const today = sevenDays[new Date().getDay()];
    // get todays habits
    const todayHabits = habits.filter((habit) => habit.day === today);
    //render habits page when clicked
    const handleClick = () => {navigate('/habits')};

    return (
        <div 
        className="bg-white p-4 rounded-lg shadow"
        onClick={handleClick}>
            <h2 className="text-xl font-bold mb-4">Today's Habits</h2>
            {todayHabits.length === 0 ? (
                <p>No habits for today.</p>
            ) : (
                <ul>
                {todayHabits.map((habit) => (
                    <li key={habit.id} className="mb-2">
                    {habit.name}
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}


export default DashboardHabits;