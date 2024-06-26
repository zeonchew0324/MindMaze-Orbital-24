import { unpackTTData, packTTData } from "../../../src/utils/timetable";

describe('unpackTTData', () => {
  it('converts TimeBlockData array to TimeBlock array with calculated durations', () => {
    const tbData = [
      { id: '1', name: 'test1', day: 'Mon', startTime: '09:00', endTime: '10:00' },
      { id: '2', name: 'test2', day: 'Mon', startTime: '11:00', endTime: '13:00' },
    ];
    const result = unpackTTData(tbData);
    expect(result.length).toBe(2);
    expect(result[0].duration).toBe('1:00');
    expect(result[1].duration).toBe('2:00');
  });
});

describe('packTTData', () => {
  it('converts TimeBlock array to TimeBlockData array', () => {
    const tbArray = [
      { id: '1', name: 'Test Block 1', startTime: '09:00', endTime: '10:00', duration: '01:00', day: 'Mon' },
      { id: '2', name: 'Test Block 2', startTime: '11:00', endTime: '12:00', duration: '01:00', day: 'Tue' },
    ];
    const result = packTTData(tbArray);
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Test Block 1');
    expect(result[1].day).toBe('Tue');
  });
});
