import React from 'react'
import TimetableRow from './TimetableRow';

type Props = {
  day: string;
  key: number;
};

function TimetableDay(props: Props) {
  const { day, key } = props
  
  return (
    <li className="flex border-b border-blue-950 last:border-0" key={key}>
      <div className="bg-amber-600 items-center pl-2 pt-3 pb-3 font-medium border-r border-blue-950 w-[50px]">
        {day} 
      </div>
      <TimetableRow day={day}/>
    </li>
  )
}

export default TimetableDay