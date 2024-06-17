import React from 'react';
import { TimeBlock } from '../../types/timetable';
import TimetableCell from './TimetableCell';

type Props = {
  blocks: TimeBlock[];
};

const startHour = 0;
const endHour = 24;
const totalColumns = endHour - startHour;

function TimetableRow(props: Props) {
  const { blocks } = props;

  // Initialize an array to track filled cells
  const filledCells = Array(totalColumns).fill(false);

  // Mark the cells as filled based on the blocks
  blocks.forEach(block => {
    const startHour = parseInt(block.startTime.split(':')[0], 10);
    const startMinute = parseInt(block.startTime.split(':')[1], 10);
    const startIndex = startHour - 7 + (startMinute / 60);
    const durationHours = parseInt(block.duration.split(':')[0], 10) + parseInt(block.duration.split(':')[1], 10) / 60;
    const endIndex = startIndex + durationHours;

    for (let i = Math.floor(startIndex); i < Math.ceil(endIndex); i++) {
      filledCells[i] = true;
    }
  });

  // Create an array to hold the grid cells
  const gridCells = [];

  for (let i = 0; i < totalColumns; i++) {
    if (filledCells[i]) {
      // Find the block corresponding to this cell
      const block = blocks.find(block => {
        const startHour = parseInt(block.startTime.split(':')[0], 10);
        const startMinute = parseInt(block.startTime.split(':')[1], 10);
        const startIndex = startHour - 7 + (startMinute / 60);
        return Math.floor(startIndex) === i;
      });
      if (block) {
        gridCells.push(<TimetableCell key={`block-${i}`} block={block} />);
      }
    } else {
      // Add a dummy cell
      gridCells.push(
        <div
          key={`dummy-${i}`}
          className={`col-start-${i + 1} col-span-1 border-r last:border-0 m-0 text-gray-700 flex items-center justify-center`}
          style={{ gridColumn: `${i + 1} / span 1` }}
        >
          
        </div>
      );
    }
  }

  return (
    <div className="grid grid-cols-24 w-[1000px] divide-x-1">
      {gridCells}
    </div>
  );
}

export default TimetableRow;
