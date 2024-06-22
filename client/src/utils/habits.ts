import { Habit, HabitData } from "../types/habits";

export const sevenDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function unpackHabitData(res: HabitData[]) {
  // Add description when adding the decription feature
  let result: Habit[] = []

  const helper = (data: HabitData) => {
    const array = data.day.map(day => ({
      id: `${data.id}`,
      name: `${data.name}`,
      day: `${day}`
    }))
    result = result.concat(array)
  }

  res.map(habit => helper(habit))

  return result
}
