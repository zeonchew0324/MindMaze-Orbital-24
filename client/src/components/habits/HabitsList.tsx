import React from 'react';

interface Habit {
  id: number;
  name: string;
}

interface HabitsListProps {
  habits: Habit[];
}

const HabitsList: React.FC<HabitsListProps> = ({ habits }) => {
  return (
    <div className="p-4">
      {habits.length === 0 ? (
        <p>No habits recorded for this day.</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <li key={habit.id} className="p-2 border-b">
              {habit.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitsList;
