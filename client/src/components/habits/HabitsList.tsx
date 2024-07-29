import React, { useEffect, useState } from "react";
import { useHabits } from "../../contexts/HabitsProvider";
import { FaTrash, FaCheck, FaFire } from "react-icons/fa";
import { Habit } from "../../types/habits";
import { calculateHabitStreak, sevenDays } from "../../utils/habits";
import { useEnergy } from "../../contexts/EnergyProvider";
import HabitBlock from "./HabitBlock"; // Import HabitBlock

interface HabitsListProps {
  habits: Habit[];
}

const HabitsList: React.FC<HabitsListProps> = ({ habits }) => {
  const { deleteHabit, fetchHabits, updateHabits } = useHabits();
  const { increaseEnergy } = useEnergy();

  useEffect(() => {
    fetchHabits();
  }, []);

  let today = new Date().getDay();
  today = today === 0 ? 6 : today - 1;

  // Assuming Sunday (day 0) as the start of the week
  const startOfWeek = 0;

  const [selectedDay, setSelectedDay] = useState<string>(sevenDays[today]);

  // Function to check if the habit should be reset
  const shouldResetHabit = (habit: Habit) => {
    if (!habit.lastCompleted) return false;
    const lastCompletedDate = new Date(habit.lastCompleted);
    const today = new Date();
    const daysSinceLastCompletion = Math.floor(
      (today.getTime() - lastCompletedDate.getTime()) / (1000 * 3600 * 24)
    );
    return daysSinceLastCompletion >= today.getDay() - startOfWeek;
  };

  // Reset completed status for habits if the week has passed since last completion
  useEffect(() => {
    habits.forEach((habit) => {
      if (shouldResetHabit(habit)) {
        const updatedHabit = {
          ...habit,
          completed: false,
        };
        updateHabits(updatedHabit);
      }
    });
  }, [habits]);

  const handleCompleteHabit = (habit: Habit) => {
    const currstate = habit.completed;
    const updatedStreak = habit.streak + 1;
    const updatedHabit = {
      ...habit,
      streak: updatedStreak,
      completed: true,
      lastCompleted: new Date(),
    };
    updateHabits(updatedHabit);
    if (!currstate) {
      increaseEnergy(10);
    }
  };

  return (
    <div className="p-4 mb-2 text-xl">
      {habits.length === 0 ? (
        <h1>No habits recorded for this day.</h1>
      ) : (
        <ul className="w-full">
          {habits.map((habit) => (
            <HabitBlock 
              key={habit.id} 
              habit={habit} 
              selectedDay={selectedDay} 
              deleteHabit={deleteHabit} 
              handleCompleteHabit={handleCompleteHabit} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitsList;
