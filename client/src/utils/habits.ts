import { Habit, HabitData } from "../types/habits";

export const sevenDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function unpackHabitData(res: HabitData[]) {
  // Add description when adding the decription feature
  let result: Habit[] = [];

  const helper = (data: HabitData) => {
    const array = data.day.map((day) => ({
      id: `${data.id}`,
      name: `${data.name}`,
      day: `${day}`,
      streak: data.streak,
    }));
    result = result.concat(array);
  };

  res.forEach((habit) => helper(habit));

  return result;
}

export function calculateHabitStreak(habit: Habit): number {
  const today = new Date();
  const habitDay = new Date(habit.day);

  if (today.getDay() === habitDay.getDay()) {
    return habit.streak + 1;
  }

  //reset streak
  return 1;
}
