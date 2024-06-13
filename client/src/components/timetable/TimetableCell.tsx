import React from 'react'
import { TimeBlock } from '../../types/timetable';

type Prop = {
  block: TimeBlock
}

function convertDurationToNumber(duration: string): number {
  const [hours, minutes] = duration.split(':').map(Number);
  return hours + minutes / 60;
}

function TimetableCell(props: Prop) {
  const { block } = props

  return (
    <button className={`border m-0 text-[9px]`}>
      {block.name}
    </button>
  )
}

export default TimetableCell