export interface Habit {
  id: string;
  name: string;
  day: string;
  streak: number;
  completed: boolean;
  lastCompleted?: Date;
}

export interface HabitData {
  id: string;
  name: string;
  day: string[];
  description?: string;
  streak: number;
  completed: boolean;
  lastCompleted: Date;
}
