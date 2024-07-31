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

export function unpackHabitData(res: HabitData[]): Habit[] {
  let result: Habit[] = [];

  const helper = (data: HabitData) => {
    // Ensure day is an array
    const days = Array.isArray(data.day) ? data.day : [data.day];

    const array = days.map((day) => ({
      id: data.id,
      name: data.name,
      day: day,
      streak: data.streak || 0,
      completed: data.completed || false,
    }));

    result = result.concat(array);
  };

  res.forEach((habit) => helper(habit));

  return result;
}

export function completeHabitHelper(req: Habit, arr: HabitData[]) {
  return arr.map(habit => habit.id === req.id ? {...habit, completed: true} : habit)
}

export function calculateHabitStreak(habit: Habit): number {
  const today = new Date();
  const habitDay = new Date(habit.day);

  // Reset the time part of the dates to compare only the dates
  today.setHours(0, 0, 0, 0);
  habitDay.setHours(0, 0, 0, 0);

  if (today.getTime() === habitDay.getTime()) {
    return habit.streak + 1; // Increment streak if completed today
  } else if (today > habitDay) {
    return 0; // Reset streak if habit day has passed and not completed
  }

  return habit.streak; // Otherwise, return current streak
}
