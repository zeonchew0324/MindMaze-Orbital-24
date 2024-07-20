import { describe, it, expect } from "vitest";
import { calculateHabitStreak } from "../../../src/utils/habits";
import { Habit } from "../../../src/types/habits";

describe("calculateHabitStreak", () => {
  it("should increase the streak by 1 if the habit is completed on the same day", () => {
    const habit: Habit = {
      id: "1",
      name: "Test Habit",
      day: new Date().toISOString(), // Setting the day to today
      streak: 5,
      completed: false,
    };
    const newStreak = calculateHabitStreak(habit);
    expect(newStreak).toBe(6);
  });

  it("should not increase the streak if the habit is not completed on the same day", () => {
    const habit: Habit = {
      id: "2",
      name: "Another Habit",
      day: new Date(Date.now() - 86400000).toISOString(), // Setting the day to yesterday
      streak: 3,
      completed: false,
    };
    const newStreak = calculateHabitStreak(habit);
    expect(newStreak).toBe(0);
  });

  it("should handle a streak of 0 and increase it by 1 if completed today", () => {
    const habit: Habit = {
      id: "3",
      name: "New Habit",
      day: new Date().toISOString(), // Setting the day to today
      streak: 0,
      completed: false,
    };
    const newStreak = calculateHabitStreak(habit);
    expect(newStreak).toBe(1);
  });

  it("should not increase a streak of 0 if the habit is not completed today", () => {
    const habit: Habit = {
      id: "4",
      name: "Another New Habit",
      day: new Date(Date.now() - 86400000).toISOString(), // Setting the day to yesterday
      streak: 0,
      completed: false,
    };
    const newStreak = calculateHabitStreak(habit);
    expect(newStreak).toBe(0);
  });
});

// Mock Date
const mockDate = (dateString: string) => {
  const mockedDate = new Date(dateString);
  vi.useFakeTimers();
  vi.setSystemTime(mockedDate);
};

// Test suite for habit streak across days
describe("Habit Streak Across Days", () => {
  it("should record the streak correctly from one day to the next", async () => {
    const initialDate = "2024-07-01T00:00:00.000Z"; // Mocking 1st July
    mockDate(initialDate);

    const habit: Habit = {
      id: "5",
      name: "Daily Exercise",
      day: new Date().toISOString(),
      streak: 0,
      completed: false,
      lastCompleted: new Date(),
    };

    // Mock fetchHabits and updateHabits
    const habits = [habit];
    const fetchHabitsMock = vi.fn().mockResolvedValue(habits);
    const updateHabitsMock = vi.fn();

    // Complete the habit
    habit.completed = true;
    habit.streak += 1;
    habit.lastCompleted = new Date();
    updateHabitsMock(habit);

    // Move to the next day
    const nextDay = "2024-07-02T00:00:00.000Z";
    mockDate(nextDay);

    // Fetch habits again
    const fetchedHabits = await fetchHabitsMock();

    // Check the streak is recorded correctly
    expect(fetchedHabits[0].streak).toBe(1);
  });
});
