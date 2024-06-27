import { convertDurationToNumber } from "../../../src/utils/timetable";

describe('convertDurationToNumber', () => {
  it('converts duration string to number of hours', () => {
    expect(convertDurationToNumber('01:30')).toBeCloseTo(1.5);
  });

  it('handles zero minutes correctly', () => {
    expect(convertDurationToNumber('03:00')).toBe(3);
  });

  it('handles edge cases like empty input', () => {
    expect(convertDurationToNumber('')).toBe(NaN);
  });
});
