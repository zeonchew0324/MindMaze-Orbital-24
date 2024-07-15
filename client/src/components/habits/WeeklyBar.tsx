import React from "react";

interface WeeklyBarProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

const sevenDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeeklyBar: React.FC<WeeklyBarProps> = ({
  selectedDay,
  setSelectedDay,
}) => {
  const handleLeftArrow = () => {
    const currentIndex = sevenDays.indexOf(selectedDay);
    const newIndex =
      currentIndex === 0 ? sevenDays.length - 1 : currentIndex - 1;
    setSelectedDay(sevenDays[newIndex]);
  };

  const handleRightArrow = () => {
    const currentIndex = sevenDays.indexOf(selectedDay);
    const newIndex =
      currentIndex === sevenDays.length - 1 ? 0 : currentIndex + 1;
    setSelectedDay(sevenDays[newIndex]);
  };

  return (
    <div>
      <div className="hidden sm:flex justify-between items-center mb-6 bg-white rounded-lg shadow overflow-x-auto">
        {sevenDays.map((day) => (
          <button
            key={day}
            className={`px-4 py-2 text-sm font-medium ${
              selectedDay === day
                ? "bg-orange-600 text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="sm:hidden flex justify-between items-center mb-6 bg-white rounded-lg shadow min-w-[150px]">
        <button
          className="p-2 text-gray-500 hover:text-gray-700"
          onClick={handleLeftArrow}
        >
          &#9664; {/* Left arrow */}
        </button>
        <span className="text-gray-800 text-sm font-medium">{selectedDay}</span>
        <button
          className="p-2 text-gray-500 hover:text-gray-700"
          onClick={handleRightArrow}
        >
          &#9654; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
};

export default WeeklyBar;
