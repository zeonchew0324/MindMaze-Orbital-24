import React from 'react'
import { TimeBlock } from '../../types/timetable'
import TimetableCell from './TimetableCell'

type Props = {
  blocks: TimeBlock[]
}

function TimetableRow(props: Props) {
  const { blocks } = props 
  return (
    <div className="relativ<e flex flex-1 min-w-[500px] mb-[1px]">
      {blocks.map(b => <TimetableCell block={b}/>)}
    </div>
  )
}

export default TimetableRow