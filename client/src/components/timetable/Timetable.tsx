import React from 'react'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Timetable() {
  return (
    <div>
      <div>
        #Timings
      </div>
      <ol>
        {days.map((day, index) => (
          day
        ))}
      </ol>
    </div>
  )
}

export default Timetable