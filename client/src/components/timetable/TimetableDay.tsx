import React from 'react'
import TimetableRow from './TimetableRow';

/*
  Test prop
 */

const testBlocks = [
  {
    id: 'test0',
    name: 'existential crisis',
    startTime: '10:00',
    duration: '1:00',
    endTime: '11:00',
    day: 'Mon',
  },
  {
    id: 'test1',
    name: 'cry',
    startTime: '10:00',
    duration: '1:00',
    endTime: '11:00',
    day: 'Mon',
  },
  {
    id: 'test2',
    name: 'sleep',
    startTime: '10:00',
    duration: '1:00',
    endTime: '11:00',
    day: 'Mon',
  }
]

type Props = {
  day: string;
};

function TimetableDay(props: Props) {
  const {day} = props

  return (
    <li className="flex border-b border-gray-200 last:border-0 h-[50px]">
      <div className="pl-2 pt-3 pb-3 font-medium border-r border-gray-200 w-[50px]" >
        {day}
      </div>
      <TimetableRow blocks={testBlocks.filter(x => x.day === day)} />
    </li>
  )
}

export default TimetableDay