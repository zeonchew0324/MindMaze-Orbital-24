import React from "react";
import { useNavigate } from "react-router-dom";
import { useHabits } from "../../contexts/HabitsProvider";
import { sevenDays } from "../../utils/habits";

const DashboardHabits: React.FC = () => {
  const navigate = useNavigate();
  const { habits } = useHabits();
  //get todays habits
  let today = new Date().getDay() - 1;
  today = today === -1 ? 6 : today - 1;
  const newToday = sevenDays[today];
  const todaysHabits = habits.filter((habit) => habit.day === newToday);

  //render habits page when clicked
  const handleClick = () => {
    navigate("/habits");
  };

  return (
    <div
      className="bg-white p-6 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors h-full"
      onClick={handleClick}
    >
      <h2 className="text-2xl font-bold mb-6 text-black">Today's Habits</h2>
      {todaysHabits.length === 0 ? (
        <p className="text-lg text-black">No habits for today.</p>
      ) : (
        <ul className="space-y-4">
          {todaysHabits.map((habit) => (
            <li key={habit.id} className="text-lg text-black">
              {habit.name}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-base text-blue-600">Click to view all habits</p>
    </div>
  );
};

export default DashboardHabits;
