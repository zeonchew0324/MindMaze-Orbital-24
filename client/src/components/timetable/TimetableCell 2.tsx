import React from 'react';
import { TimeBlock } from '../../types/timetable';
import { useTimetablePopup } from '../../contexts/TimetablePopupProvider';
import { calculateColumn } from '../../utils/timetable';

type Prop = {
  block: TimeBlock;
};

function TimetableCell(props: Prop) {
  const { isPopupOpen, openPopup, closePopup } = useTimetablePopup();
  const { block } = props;

  const handleEditClick = () => {
    openPopup(block);
  };

  const { start, span } = calculateColumn(block.startTime, block.duration);

  return (
    <>
      <button
        className={`col-start-${start + 1} col-span-${span} rounded-md border-blue-600 border text-[10px] m-0 p-2 bg-blue-500 text-white min-h-11 h-full overflow-hidden whitespace-nowrap text-ellipsis`}
        style={{ gridColumn: `${start + 1} / span ${span}` }}
        onClick={handleEditClick}
      >
        {block.name}
      </button>
    </>
  );
}

export default TimetableCell