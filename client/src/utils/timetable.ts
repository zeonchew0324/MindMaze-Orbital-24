export function convertDurationToNumber(duration: string): number {
  const [hours, minutes] = duration.split(':').map(Number);
  return hours + minutes / 60;
}

export function calculateDuration(start: string, end: string): string {
  const dur = Number(end.split(':')[0]) - Number(start.split(':')[0])
  return dur.toString() + ':00' 
}

export function calculateColumn(startTime: string, duration: string): { start: number; span: number } {
  const startHour = parseInt(startTime.split(':')[0], 10) - 7; // Assuming 7:00 as the starting hour
  const startMinute = parseInt(startTime.split(':')[1], 10);
  const durationHours = convertDurationToNumber(duration);

  const startColumn = startHour + (startMinute / 60);
  const columnSpan = durationHours;

  return { start: Math.floor(startColumn), span: Math.ceil(columnSpan) };
}
