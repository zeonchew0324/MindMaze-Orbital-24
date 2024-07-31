type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface Habit {
  id?: string;
  name?: string;
  day: Day[];
  description?: string;
  streak?: number;
  completed?: boolean;
  lastCompleted: Date;
}


function calculateDaysSinceLastDay(days: Day[], today: Day): number {
    const daysOfWeek: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayIndex = daysOfWeek.indexOf(today);

    if (todayIndex === -1) {
        throw new Error('Invalid day provided for today.');
    }

    const dayIndices = days.map(day => {
        const index = daysOfWeek.indexOf(day);
        if (index === -1) {
            throw new Error(`Invalid day in array: ${day}`);
        }
        return index;
    });

    let minDistance = 7;

    dayIndices.forEach(dayIndex => {
        let distance = todayIndex - dayIndex;
        if (distance <= 0) {
            distance += 7;
        }
        if (distance < minDistance) {
            minDistance = distance;
        }
    });

    return minDistance;
}

function calculateDaysBetween(date1: Date, date2: Date): number {
  // Ensure the dates are valid
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      throw new Error('Invalid Date object');
  }

  // Calculate the difference in time
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
  const differenceInTime = date2.getTime() - date1.getTime();

  // Convert the difference in milliseconds to days
  const differenceInDays = Math.round(differenceInTime / oneDay);

  return differenceInDays;
}

function isStreakBroken(habit: Habit): boolean {
  const today = new Date();
  const daysOfWeek: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDay: Day = daysOfWeek[today.getDay()];

  const daysSinceLastDay = calculateDaysSinceLastDay(habit.day, todayDay);
  const daysSinceLastCompleted = calculateDaysBetween(habit.lastCompleted, today);
  console.log(daysSinceLastDay, daysSinceLastCompleted)

  return daysSinceLastCompleted > daysSinceLastDay;
}
