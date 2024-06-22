export interface Habit {
  id: string
  name: string
  day: string
}

export interface HabitData {
  id: string
  name: string
  day: string[]
  description?: string
}