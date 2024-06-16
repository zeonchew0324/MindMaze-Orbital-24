import React from 'react';
import { TimeBlock } from '../../types/timetable';
import { useTimetablePopup } from '../../contexts/TimetablePopupProvider';
import EditTimeblock from './EditTimeblock';
import TimetablePopup from './TimetablePopup';
import { calculateColumn } from '../../utils/timetable';

type Prop = {
  block: TimeBlock;
};

function TimetableCell(props: Prop) {
  const { isPopupOpen, openPopup, closePopup } = useTimetablePopup()

  const handleEditClick = () => {
    openPopup();
  };

  const { block } = props;
  const { start, span } = calculateColumn(block.startTime, block.duration);

  return (
    <>
      <button
        className={`col-start-${start + 1} col-span-${span} border m-0 bg-blue-500 text-white flex items-center justify-center`}
        style={{ gridColumn: `${start + 1} / span ${span}` }}
        onClick={handleEditClick}
      >
        {block.name}
      </button>
      <TimetablePopup isOpen={isPopupOpen} onClose={closePopup}>
        <EditTimeblock />
      </TimetablePopup>
    </>
    
  );
}

export default TimetableCell;
