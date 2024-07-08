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
    };
    const newStreak = calculateHabitStreak(habit);
    expect(newStreak).toBe(0);
  });
});
