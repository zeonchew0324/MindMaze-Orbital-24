import React from 'react'

type Props = {
  day: string;
};

function TimetableDay(props: Props) {
  const {day} = props

  return (
    <li>
      <div>
        Day of the week
      </div>
      <div>
        {day}
      </div>
    </li>
  )
}

export default TimetableDay