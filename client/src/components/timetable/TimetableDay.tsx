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
    day: 'Monday',
  },
  {
    id: 'test1',
    name: 'cry',
    startTime: '10:00',
    duration: '1:00',
    endTime: '11:00',
    day: 'Monday',
  },
  {
    id: 'test2',
    name: 'sleep',
    startTime: '10:00',
    duration: '1:00',
    endTime: '11:00',
    day: 'Monday',
  }
]

type Props = {
  day: string;
};

function TimetableDay(props: Props) {
  const {day} = props

  return (
    <li className="flex items-center border-b border-gray-200 last:border-0 w-full">
      <div className="pl-2 pt-2 pb-2 font-medium border-r border-gray-200 w-20 " >
        {day}
      </div>
      <div className="text-gray-100 flex-grow w-full">
        <TimetableRow blocks={testBlocks} />
      </div>
    </li>
  )
}

export default TimetableDay