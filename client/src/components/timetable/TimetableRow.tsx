import React from 'react'
import { TimeBlock } from '../../types/timetable'
import TimetableCell from './TimetableCell'

type Props = {
  blocks: TimeBlock[]
}

const start = '7:00'
const end = '24:00'
const pxWidth = 100
const numOfHours = Number(end.split(':')[0]) - Number(start.split(':')[0])
const hoursWidth = (numOfHours: number) => {
  const width = numOfHours * pxWidth
  return `w-[${width.toString()}px]`
}


function TimetableRow(props: Props) {
  console.log(numOfHours)
  const { blocks } = props 
  return (
    <div className={"bg-red-900 grid grid-cols-24 h-full w-[1000px] divide-x-1"}>
      {blocks.map((b, index) => <TimetableCell key={index} block={b}/>)}
    </div>
  )
}

export default TimetableRow