import React from "react";
import { FaTrash, FaCheck, FaFire } from "react-icons/fa";
import { Habit } from "../../types/habits";
import { calculateHabitStreak } from "../../utils/habits";

interface HabitBlockProps {
  habit: Habit;
  selectedDay: string;
  deleteHabit: (id: string) => void;
  handleCompleteHabit: (habit: Habit) => void;
}

const HabitBlock: React.FC<HabitBlockProps> = ({ habit, selectedDay, deleteHabit, handleCompleteHabit }) => {
  return (
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
          disabled={habit.completed}
        >
          <FaCheck className="mr-2" />
          {habit.completed ? "Completed" : "Complete"}
        </button>
      )}
    </li>
  );
};

export default HabitBlock;
