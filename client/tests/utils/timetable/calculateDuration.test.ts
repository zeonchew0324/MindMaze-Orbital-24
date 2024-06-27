import { calculateDuration } from "../../../src/utils/timetable";

describe('calculateDuration', () => {
  it('calculates duration between two times correctly', () => {
    expect(calculateDuration('09:00', '11:30')).toBe('2:00');
  });

  it('handles cases where end time is before start time', () => {
    expect(calculateDuration('12:00', '10:00')).toBe('-2:00');
  });
});
