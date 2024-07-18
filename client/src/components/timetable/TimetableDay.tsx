import React from 'react'
import TimetableRow from './TimetableRow';

type Props = {
  day: string;
  key: number;
};

function TimetableDay(props: Props) {
  const { day, key } = props
  
  return (
    <li className="flex border-b border-gray-300 last:border-0" key={key}>
      <div className="flex bg-orange-500 items-center pl-2.5 pt-3 pb-3 text-sm w-[50px] min-h-[50px] text-white">
        {day} 
      </div>
      <TimetableRow day={day}/>
    </li>
  )
}

export default TimetableDay