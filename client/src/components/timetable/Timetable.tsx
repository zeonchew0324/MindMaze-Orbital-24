import React, { useState } from 'react'
import TimetableDay from './TimetableDay'
import TimetablePopupCreate from './TimetablePopupCreate';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Timetable() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  
  return (
    <>
      <div>
        <div>
          #Timings
        </div>
        <ol className="w-100% border border-gray-200 rounded-md">
          {days.map((day, index) => (
            <TimetableDay day={day}/>
          ))}
        </ol>
      </div>
      <div className="flex justify-end mt-2 mb-0">
        <button 
          onClick={handleOpenPopup} 
          className="relative p-2 border border-1 bg-blue-500  text-gray-100 hover:text-gray-300">
          Add Activity
        </button>
      </div>
      <TimetablePopupCreate isOpen={isPopupOpen} onClose={handleClosePopup}>
        <h2 className="text-xl text-black font-semibold mb-4">Popup Title</h2>
        <p className="mb-4 text-black">This is the content of the popup.</p>
        <button
          onClick={handleClosePopup}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Close
        </button>
      </TimetablePopupCreate>
    </>
  )
}

export default Timetable