import React from 'react';
import { TimeBlock } from '../../types/timetable';
import { useTimetablePopup } from '../../contexts/TimetablePopupProvider';

type Prop = {
  block: TimeBlock;
};

function convertDurationToNumber(duration: string): number {
  const [hours, minutes] = duration.split(':').map(Number);
  return hours + minutes / 60;
}

function calculateColumn(startTime: string, duration: string): { start: number; span: number } {
  const startHour = parseInt(startTime.split(':')[0], 10) - 7; // Assuming 7:00 as the starting hour
  const startMinute = parseInt(startTime.split(':')[1], 10);
  const durationHours = convertDurationToNumber(duration);

  const startColumn = startHour + (startMinute / 60);
  const columnSpan = durationHours;

  return { start: Math.floor(startColumn), span: Math.ceil(columnSpan) };
}

function TimetableCell(props: Prop) {
  const { isPopupOpen, openPopup, closePopup } = useTimetablePopup()

  const { block } = props;
  const { start, span } = calculateColumn(block.startTime, block.duration);

  return (
    <button
      className={`col-start-${start + 1} col-span-${span} border m-0 bg-blue-500 text-white flex items-center justify-center`}
      style={{ gridColumn: `${start + 1} / span ${span}` }}
    >
      {block.name}
    </button>
  );
}

export default TimetableCell;
