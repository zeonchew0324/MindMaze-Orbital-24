import { calculateColumn } from "../../../src/utils/timetable";

describe('calculateColumn', () => {
  it('calculates column start and span correctly', () => {
    expect(calculateColumn('09:00', '02:00')).toEqual({ start: 9, span: 2 });
  });

  it('handles fractional start hours correctly', () => {
    expect(calculateColumn('09:30', '01:30')).toEqual({ start: 9, span: 2 });
  });
});
