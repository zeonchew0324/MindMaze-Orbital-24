import React, { useEffect } from "react";
import { useHabits } from "../../contexts/HabitsProvider";
import { FaTrash, FaCheck } from "react-icons/fa";
import { Habit } from "../../types/habits";
import { calculateHabitStreak } from "../../utils/habits";

interface HabitsListProps {
  habits: Habit[];
}

const HabitsList: React.FC<HabitsListProps> = ({ habits }) => {
  const { deleteHabit, fetchHabits, updateHabits } = useHabits();
  useEffect(() => {
    fetchHabits();
  }, []);

  const handleCompleteHabit = (habit: Habit) => {
    const updatedStreak = calculateHabitStreak(habit);
    const updatedHabit = {
      ...habit,
      streak: updatedStreak,
      day: new Date().toISOString(),
    };
    updateHabits(updatedHabit);
  };

  return (
    <div className="p-4 mb-2 text-xl">
      {habits.length === 0 ? (
        <h1>No habits recorded for this day.</h1>
      ) : (
        <ul className="w-full">
          {habits.map((habit) => (
            <li key={habit.id} className="flex items-center p-2 border-b">
              <span className="flex-grow text-xl text-white font-bold pr-52">
                {habit.name}
              </span>
              <span className="text-sm text-gray-400 mr-2">
                Streak: {calculateHabitStreak(habit)}
              </span>
              <button
                className="text-white rounded-xl bg-red-500 hover:bg-red-700 p-2 ml-10 flex items-center"
                onClick={() => deleteHabit(habit.id)}
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
              <button
                className="text-white rounded-xl bg-green-500 hover:bg-green-700 p-2 ml-10 flex items-center"
                onClick={() => handleCompleteHabit(habit)}
              >
                <FaCheck className="mr-2" />
                Complete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitsList;
