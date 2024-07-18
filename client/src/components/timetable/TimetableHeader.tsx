import React from 'react'

function TimetableHeader() {
  return (
    <li className=''>
      <div className='inset-0 grid grid-cols-25'>
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="col-span-1 text-[10px] relative right-3"
          >
            {i === 0 ? <div className='w-[40px]' /> : i < 12 ? (i - 1) + ' AM' : (i === 12 ? '12 PM' : (i - 13) + ' PM')} 
          </div>
        ))}
      </div>
    </li>
  )
}

export default TimetableHeader