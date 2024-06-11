import React from 'react'
import TimetableDay from './TimetableDay'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Timetable() {
  return (
    <div>
      <div>
        #Timings
      </div>
      <ol>
        {days.map((day, index) => (
          <TimetableDay day={day}/>
        ))}
      </ol>
    </div>
  )
}

export default Timetable