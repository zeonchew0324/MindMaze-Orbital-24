import React from 'react'

function TimetableHeader() {
  return (
    <li className=''>
      <div className='inset-0 grid grid-cols-25'>
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="col-span-1 text-[10px]"
          >
            {i === 0 ? <div className='w-[40px]' /> : i >= 11 ? (i - 1) + '00': '0' + (i - 1) + '00'} 
          </div>
        ))}
      </div>
    </li>
  )
}

export default TimetableHeader