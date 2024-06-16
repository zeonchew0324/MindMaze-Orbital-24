import React from 'react'
import TimetableRow from './TimetableRow';
import { useTimeblock } from '../../contexts/TimeblockProvider';

type Props = {
  day: string;
};

function TimetableDay(props: Props) {
  const {day} = props
  
  const { timeBlocks } = useTimeblock()

  return (
    <li className="flex border-b border-gray-200 last:border-0">
      <div className="items-center pl-2 pt-3 pb-3 font-medium border-r border-gray-200 w-[50px]">
        {day} 
      </div>
      <TimetableRow blocks={timeBlocks.filter(x => x.day === day)} />
    </li>
  )
}

export default TimetableDay