import React from 'react'
import { TimeBlock } from '../../types/timetable'

type Props = {
  blocks: TimeBlock[]
}

function TimetableRow(props: Props) {
  const { blocks } = props 
  return (
    <div className="relative flex flex-1 min-w-[500px] mb-[1px]">
      {blocks.map(block => block.name)}
  </div>
  )
}

export default TimetableRow