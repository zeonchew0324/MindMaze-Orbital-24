const { firestoreDb } = require('../firebase/firebase-config')
import { collection, doc, updateDoc } from 'firebase/firestore';

type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface Habit {
  id: string;
  name: string;
  day: Day[];
  description?: string;
  streak: number;
  completed: boolean;
  lastCompleted: string;
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
  
  function calculateDaysBetween(date1Str: string, date2Str: string): number {
    const str1 = formatDateStringManually(date1Str);
    const str2 = formatDateStringManually(date2Str);

    if (!str1 || !str2) {
      return 0
    }

    const date1 = new Date(str1)
    const date2 = new Date(str2)

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
  
export function isStreakBroken(habit: Habit): boolean {
    const today = new Date();
    const daysOfWeek: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayDay: Day = daysOfWeek[today.getDay()];

    const daysSinceLastDay = calculateDaysSinceLastDay(habit.day, todayDay);
    const daysSinceLastCompleted = calculateDaysBetween(habit.lastCompleted, today.toString());

    return daysSinceLastCompleted > daysSinceLastDay;
}
  
  function formatDateStringManually(dateString: string): string {
    if (!dateString) {
        return "";
    }

    const months: { [key: string]: string } = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04',
        May: '05', Jun: '06', Jul: '07', Aug: '08',
        Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };

    const parts = dateString.split(' ');

    if (parts.length < 4) {
        throw new Error('Invalid date string format');
    }

    const day = parts[2];
    const month = months[parts[1]];
    const year = parts[3];

    if (!day || !month || !year) {
        throw new Error('Invalid date string format');
    }

    return `${year}-${month}-${day}`;
}

export async function updateHabitStreaks(habits: any[], userId: string) {
  const db = firestoreDb;
  const updatedHabits: any[] = [];

  try {
    for (let habit of habits) {
      if (isStreakBroken(habit)) {
        habit.streak = 0; // Reset streak
        habit.completed = false;

        const habitsColRef = collection(db, `users/${userId}/habitsCollection`);
        const habitDocRef = doc(habitsColRef, habit.id);
        await updateDoc(habitDocRef, {
            streak: habit.streak,
            completed: habit.completed
        });
      }
      updatedHabits.push(habit);
    }
    return updatedHabits;
  } catch (error) {
    throw error
  }
}

function areDatesOnDifferentDays(date1: Date, date2: Date): boolean {
  return date1.getFullYear() !== date2.getFullYear() ||
         date1.getMonth() !== date2.getMonth() ||
         date1.getDate() !== date2.getDate();
}

export async function resetHabitCompletion(habits: Habit[], userId: string): Promise<Habit[]> {
  const db = firestoreDb;
  const updatedHabits: Habit[] = [];

  try {
    for (let habit of habits) {
      const today = new Date();

      // Check if today's date is after lastCompleted
      if (areDatesOnDifferentDays(today, new Date(formatDateStringManually(habit.lastCompleted)))) {
        habit.completed = false;
      }

      const habitsColRef = collection(db, `users/${userId}/habitsCollection`);
      const habitDocRef = doc(habitsColRef, habit.id);
      await updateDoc(habitDocRef, {
        completed: habit.completed
      });

      updatedHabits.push(habit);
    }
    return updatedHabits;
  } catch (error) {
    throw error;
  }
}