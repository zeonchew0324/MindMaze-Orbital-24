import React from 'react';
import { useTodos } from '../../contexts/TodoProvider';
import { useHabits } from '../../contexts/HabitsProvider';

const DashboardReminder: React.FC = () => {
  const { habits } = useHabits();
  const { todos } = useTodos();
  const today = new Date().setHours(0, 0, 0, 0); // Get today's date with time set to 00:00:00
  const remainingTodos = todos.filter(todo => new Date(todo.deadline).setHours(0, 0, 0, 0) === today).length;

  return (
    <div className="bg-white mt-4 p-6 rounded-lg shadow hover:bg-gray-200 transition-colors h-full">
      <p className="text-lg text-black font-bold">
        You have {remainingTodos} remaining todo{remainingTodos !== 1 ? 's' : ''} for today.
      </p>
      <p className="text-lg text-black font-bold">
        You have not completed habits yet.
      </p>
    </div>
  );
};

export default DashboardReminder;