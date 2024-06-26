import React from 'react';
import { TimeBlock } from '../../types/timetable';
import TimetableCell from './TimetableCell';
import { useTimeblock } from '../../contexts/TimeblockProvider';
import { sortWithStartTime } from '../../utils/timetable';

type Props = {
  day: string
};

const startHour = 0;
const endHour = 24;
const totalColumns = endHour - startHour;

function TimetableRow(props: Props) {
  const { day } = props
  const { timeBlocks } = useTimeblock();
  const blocks = timeBlocks.filter(x => x.day == day)

  return (
    <>
      <div role="grid" className="flex relative w-full">
          <div className="absolute inset-0 grid grid-cols-24">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="col-span-1 border-r last:border-0 border-blue-950"
                style={{ backgroundColor: `${i % 2 === 0 ? 'moccasin' : 'papayawhip'}` }}
              > 
              </div>
            ))}
          </div>
          <div className="w-full inset-0 grid grid-cols-24 z-10">
            {blocks.sort(sortWithStartTime).map(block => <TimetableCell block={block} />)}
          </div>
      </div>
    </>
  );
}

export default TimetableRow;
