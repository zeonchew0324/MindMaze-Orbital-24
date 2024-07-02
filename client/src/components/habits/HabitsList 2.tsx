import React from 'react';
import { useHabits } from '../../contexts/HabitsProvider';
import { FaTrash } from 'react-icons/fa';
import { Habit } from '../../types/habits';

interface HabitsListProps {
  habits: Habit[];
}

const HabitsList: React.FC<HabitsListProps> = ({ habits }) => {
  const { deleteHabit } = useHabits();
  return (
    <div className="p-4 pb-10 text-xl ">
      {habits.length === 0 ? (
        <h1>No habits recorded for this day.</h1>
      ) : (
        <ul className = "w-full">
          {habits.map((habit) => (
            <li key={habit.id} className="flex items-center p-2 border-b">
              <span className="flex-grow text-xl text-white font-bold pr-52">{habit.name}</span>
              <button
                className="text-white rounded-xl bg-red-500 hover:bg-red-700 p-2 ml-10 flex items-center"
                onClick={() => deleteHabit(habit.id)}
              >
                <FaTrash className="mr-2"/>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitsList;