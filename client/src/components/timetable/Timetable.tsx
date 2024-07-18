import React, { useEffect, useState } from 'react'
import TimetableDay from './TimetableDay'
import TimetablePopup from './TimetablePopup';
import CreateTimeblock from './CreateTimeblock';
import { useTimetablePopup } from '../../contexts/TimetablePopupProvider';
import TimetableHeader from './TimetableHeader';
import { useTimeblock } from '../../contexts/TimeblockProvider';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Timetable() {
  const { isPopupOpen, openPopup, closePopup } = useTimetablePopup()
  const {fetchTimeBlocks} = useTimeblock()
  
  useEffect(() => {
    fetchTimeBlocks()
  }, [])

  return (
    <>
      <div className='max-w-[80vw] overflow-auto border p-1 bg-white rounded-md shadow-md'>
        <div className="min-w-[1200px] w-full">
          <ol className="w-full  bg-white rounded-md overflow-hidden">
            <TimetableHeader />
          </ol>
          <ol className="w-full  bg-white rounded-md overflow-hidden">
            {days.map((day, index) => (
              <TimetableDay day={day} key={index} />
            ))}
          </ol>
        </div>
      </div>
      <div className="flex justify-end mt-2 mb-0">
        <button 
          onClick={() => openPopup(undefined)} 
          className="relative rounded-md my-3 p-2.5 bg-orange-500  text-gray-100 hover:text-gray-300 hover:shadow-inner">
          Add Activity
        </button>
      </div>
      <TimetablePopup isOpen={isPopupOpen} onClose={closePopup}>
        <CreateTimeblock />
      </TimetablePopup>
    </>
  )
}

export default Timetable