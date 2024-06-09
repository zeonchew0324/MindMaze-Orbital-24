import React, { useEffect, useState } from "react";
import WeeklyBar from "../../components/habits/WeeklyBar";
import NavBar from "../../components/navBar/NavBar";
import HabitsList from '../../components/habits/HabitsList';
import { useHabits } from '../../contexts/HabitsProvider';


const HabitsPage: React.FC = () => { 
    const sevenDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const[selectedDay, setSelectedDay] = useState<string>(sevenDays[new Date().getDay()]);
    const [showAddForm, setShowAddForm] = useState(false);
    const { addHabit, habits } = useHabits();
    const filteredHabits = habits.filter((habit) => habit.day === selectedDay);
    const [habitName, setHabitName] = useState('');

    useEffect(() => {setSelectedDay(sevenDays[new Date().getDay()]);},[]);

    const handleAddHabit = () => {
        setShowAddForm(true);
    };

    const handleSubmitHabit = () => {
        if (habitName.trim() !== '') {
            addHabit({ id: Date.now(), name: habitName, day: '' }); 
            setHabitName('');
            setShowAddForm(false);
          }
    };


    return (
        
        <div>
            <WeeklyBar selectedDay = {selectedDay} setSelectedDay={setSelectedDay}/>
            <HabitsList habits={filteredHabits} />
            <div>
                <button onClick={handleAddHabit}>Add new habit</button>
                {showAddForm && (
                  <div>
                    <input
                      className = 'text-black'
                      type="text"
                      value={habitName}
                      onChange={(e) => setHabitName(e.target.value)}
                      placeholder="Enter habit name"
                    />
                    <button onClick={handleSubmitHabit}>Add Habit</button>
                  </div>
                )}
            </div>
        </div>
        
        
    )
}

export default HabitsPage;
