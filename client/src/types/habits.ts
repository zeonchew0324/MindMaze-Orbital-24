export interface Habit {
  id: string;
  name: string;
  day: string;
  streak: number;
}

export interface HabitData {
  id: string;
  name: string;
  day: string[];
  description?: string;
  streak: number;
}
