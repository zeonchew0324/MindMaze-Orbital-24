import React from 'react';
import { useTodos } from '../../contexts/TodoProvider';
import { useHabits } from '../../contexts/HabitsProvider';

function isToday(day: string): boolean {
  const daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const todayDay: string = daysOfWeek[today.getDay()];

  return day === todayDay;
}

const DashboardReminder: React.FC = () => {
  const { habits } = useHabits();
  const { todos } = useTodos();
  const today = new Date().setHours(0, 0, 0, 0); // Get today's date with time set to 00:00:00
  const remainingTodos = todos.filter(todo => new Date(todo.deadline).setHours(0, 0, 0, 0) === today).length;
  const remainingHabits = habits.filter(hb => !hb.completed && isToday(hb.day)).length;

  return (
    <div className="bg-white mt-4 p-6 rounded-lg hover:bg-gray-200 transition-colors h-full">
      <p className="text-lg text-black font-bold">
        You have {remainingTodos} remaining todo{remainingTodos !== 1 ? 's' : ''} for today.
      </p>
      <p className="text-lg text-black font-bold">
      You have {remainingHabits} remaining habit{remainingHabits !== 1 ? 's' : ''} for today.
      </p>
    </div>
  );
};

export default DashboardReminder;