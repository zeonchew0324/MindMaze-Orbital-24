import { TimeBlock, TimeBlockData } from "../types/timetable";

export function convertDurationToNumber(duration: string): number {
  const [hours, minutes] = duration.split(':').map(Number);
  return hours + minutes / 60;
}

export function calculateDuration(start: string, end: string): string {
  const dur = Number(end.split(':')[0]) - Number(start.split(':')[0])
  return dur.toString() + ':00' 
}

export function calculateColumn(startTime: string, duration: string): { start: number; span: number } {
  const startHour = parseInt(startTime.split(':')[0], 10);
  const durationHours = convertDurationToNumber(duration);
  const columnSpan = durationHours;

  return { start: Math.floor(startHour), span: Math.ceil(columnSpan) };
}

export function timeToHour(time: string) {
  return Number(time.split(':')[0])
}

export function sortWithStartTime(a: TimeBlock, b: TimeBlock) {
  if (timeToHour(a.startTime) < timeToHour(b.startTime)) {
    return -1
  } else if (timeToHour(a.startTime) > timeToHour(b.startTime)) {
    return 1
  } else {
    return 0
  }
}

export function unpackTTData(arr: TimeBlockData[]) {
  return arr.map(tb => ({
      ...tb,
      duration: calculateDuration(tb.startTime, tb.endTime)
  }));
}

export function packTTData(arr: TimeBlock[]) {
  return arr.map(({ id, name, startTime, endTime, day }) => ({
    id,
    name,
    startTime,
    endTime,
    day
  }));
}
