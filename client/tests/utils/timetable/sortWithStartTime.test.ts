import { TimeBlock } from "../../../src/types/timetable";
import { sortWithStartTime } from "../../../src/utils/timetable";

describe('sortWithStartTime', () => {
  it('sorts time blocks by start time in ascending order', () => {
    const timeBlocks: TimeBlock[] = [
      { id: '1', name: 'test1', startTime: '09:00', endTime: '24:00', duration: '15:00', day: 'Monday'},
      { id: '2', name: 'test2', startTime: '10:00', endTime: '24:00', duration: '14:00', day: 'Monday'},
      { id: '3', name: 'test3', startTime: '08:00', endTime: '24:00', duration: '16:00', day: 'Monday'},
    ];
    timeBlocks.sort(sortWithStartTime)
    expect(timeBlocks[0].id).toBe('3')
    expect(timeBlocks[1].id).toBe('1')
    expect(timeBlocks[2].id).toBe('2')
  });
});
