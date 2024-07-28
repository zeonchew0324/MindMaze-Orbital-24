import React from "react";
import { TimeBlock } from "../../types/timetable";
import { useTimetablePopup } from "../../contexts/TimetablePopupProvider";
import { calculateColumn } from "../../utils/timetable";

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
        className={`col-start-${
          start + 1
        } col-span-${span} rounded-md text-[10px] ml-[2px] my-[1px] p-2 bg-orange-700 text-white min-h-11 whitespace-nowrap text-ellipsis box-border border-b-[3px] border-b-orange-700`}
        style={{ gridColumn: `${start + 1} / span ${span}` }}
        onClick={handleEditClick}
      >
        {block.name}
      </button>
    </>
  );
}

export default TimetableCell;
