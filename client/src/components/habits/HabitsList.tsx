import React, { useEffect } from "react";
import { useHabits } from "../../contexts/HabitsProvider";
import { FaTrash, FaCheck, FaFire } from "react-icons/fa";
import { Habit } from "../../types/habits";
import { calculateHabitStreak } from "../../utils/habits";
import { useState } from "react";
import { sevenDays } from "../../utils/habits";

interface HabitsListProps {
  habits: Habit[];
}

const HabitsList: React.FC<HabitsListProps> = ({ habits }) => {
  const { deleteHabit, fetchHabits, updateHabits } = useHabits();
  useEffect(() => {
    fetchHabits();
  }, []);

  const [selectedDay, setSelectedDay] = useState<string>(
    sevenDays[new Date().getDay()]
  );

  const handleCompleteHabit = (habit: Habit) => {
    const currstate = habit.completed;
    const updatedStreak = currstate ? habit.streak - 1 : habit.streak + 1;
    const updatedHabit = {
      ...habit,
      streak: updatedStreak,
      completed: !currstate,
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
              <span className="text-lg text-white mr-2 flex items-center">
                <FaFire className="mr-2 text-red-500" />
                Streak: {calculateHabitStreak(habit)}
              </span>
              <button
                className="text-white rounded-xl bg-red-500 hover:bg-red-700 p-2 ml-10 flex items-center"
                onClick={() => deleteHabit(habit.id)}
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
              {habit.day === selectedDay && (
                <button
                  className="text-white rounded-xl bg-green-500 hover:bg-green-700 p-2 ml-10 flex items-center"
                  onClick={() => handleCompleteHabit(habit)}
                >
                  <FaCheck className="mr-2" />
                  {habit.completed ? "Completed" : "Complete"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitsList;
