import React, { useState } from 'react'
import TimetableDay from './TimetableDay'
import TimetablePopup from './TimetablePopup';
import CreateTimeblock from './CreateTimeblock';
import { useTimetablePopup } from '../../contexts/TimetablePopupProvider';
import TimetableHeader from './TimetableHeader';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Timetable() {
  const { isPopupOpen, openPopup, closePopup } = useTimetablePopup()
  
  return (
    <>
      <div>
        <ol className="w-100% border border-blue-950 rounded-md overflow-hidden">
          <TimetableHeader/>
          {days.map((day, index) => (
            <TimetableDay day={day} key={index}/>
          ))}
        </ol>
      </div>
      <div className="flex justify-end mt-2 mb-0">
        <button 
          onClick={() => openPopup(undefined)} 
          className="relative p-2 border border-1 bg-blue-500  text-gray-100 hover:text-gray-300">
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