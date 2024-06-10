import React from 'react';
import { useHabits } from '../../contexts/HabitsProvider';

interface Habit {
  id: number;
  name: string;
}

interface HabitsListProps {
  habits: Habit[];
}

const HabitsList: React.FC<HabitsListProps> = ({ habits }) => {
  const { deleteHabit } = useHabits();
  return (
    <div className="p-4">
      {habits.length === 0 ? (
        <h1>No habits recorded for this day.</h1>
      ) : (
        <ul >
          {habits.map((habit) => (
            <li key={habit.id} className="flex items-centre p-2 border-b">
              <span className="flex-grow">{habit.name}</span>
              <button className = "text-black p-3 ml-10"  
              onClick={() => deleteHabit(habit.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitsList;
