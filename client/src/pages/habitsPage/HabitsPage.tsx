import React, { useEffect, useState } from "react";
import WeeklyBar from "../../components/habits/WeeklyBar";
import NavBar from "../../components/navBar/NavBar";
import HabitsList from '../../components/habits/HabitsList';
import { useHabits } from '../../contexts/HabitsProvider';

const HabitsPage: React.FC = () => {
  const sevenDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [selectedDay, setSelectedDay] = useState<string>(sevenDays[new Date().getDay()]);
  const [showAddForm, setShowAddForm] = useState(false);
  const { addHabit, habits } = useHabits();
  const filteredHabits = habits.filter((habit) => habit.day === selectedDay);
  const [habitName, setHabitName] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  useEffect(() => { setSelectedDay(sevenDays[new Date().getDay()]); }, []);

  const handleAddHabit = () => {
    setShowAddForm(true);
  };

  const handleDaySelection = (day: string) => {
    setSelectedDays((prevSelectedDays) => 
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleSubmitHabit = () => {
    if (habitName.trim() !== '' && selectedDays.length > 0) {
      selectedDays.forEach((day) => {
        addHabit({ id: Date.now(), name: habitName, day });
      });
      setHabitName('');
      setSelectedDays([]);
      setShowAddForm(false);
    }
  };

  return (
    <div>
      <WeeklyBar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <HabitsList habits={filteredHabits} />
      <div>
        <button onClick={handleAddHabit}>Add new habit</button>
        {showAddForm && (
          <div>
            <input
              className='text-black'
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Enter habit name"
            />
            <div>
              {sevenDays.map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    value={day}
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDaySelection(day)}
                  />
                  {day}
                </label>
              ))}
            </div>
            <button onClick={handleSubmitHabit}>Add Habit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitsPage;
