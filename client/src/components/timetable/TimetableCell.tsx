import React from 'react'
import { TimeBlock } from '../../types/timetable';

type Prop = {
  block: TimeBlock
}

function TimetableCell(props: Prop) {
  const { block } = props
  return (
    <button className = "border h-10 ml-2 p-1">
      {block.name}
    </button>
  )
}

export default TimetableCell