import React, { useEffect, useState } from "react";
import WeeklyBar from "../../components/habits/WeeklyBar";
import NavBar from "../../components/navBar/NavBar";
import HabitsList from '../../components/habits/HabitsList';
import { useHabits } from '../../contexts/HabitsProvider';
import { CiSquarePlus } from 'react-icons/ci';

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

  const handleCancel = () => {
    setShowAddForm(false);
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
    <div className="flex flex-col items-center justify-center w-full">
      <WeeklyBar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <HabitsList habits={filteredHabits} />
      <div>
        {!showAddForm && (
          <button
            onClick={handleAddHabit}
            className="text-white bg-lime-500 rounded-xl hover:bg-green-700 p-2 ml-1 mr-2 flex items-center"
          >
            <CiSquarePlus size={20} className="mr-2" /> 
            Add new habit
          </button>
        )}
        {showAddForm && (
          <div>
            <input
              className='text-black bg-gray-200 rounded-md p-2 mb-2 w-72'
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Enter habit name"
            />
            <div>
              {sevenDays.map((day) => (
                <label key={day} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={day}
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDaySelection(day)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <span className="ml-2 mr-2 text-gray-700">{day}</span>
                </label>
              ))}
            </div>
            <div className="mt-2">
              <button
                onClick={handleSubmitHabit}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Add Habit
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitsPage;
