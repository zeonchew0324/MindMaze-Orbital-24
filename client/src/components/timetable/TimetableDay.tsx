import React from 'react'
import TimetableRow from './TimetableRow';

/*
  Test prop
 */

const testBlock = {
  id: 'test',
  name: 'wash dishes',
  startTime: '10:00',
  duration: '1:00',
  endTime: '11:00',
  day: 'Monday',
}

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
        <TimetableRow blocks={[testBlock]} />
      </div>
    </li>
  )
}

export default TimetableDay