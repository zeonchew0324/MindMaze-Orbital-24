import React, { useEffect, useState } from 'react'

type Message = {
  message: String
}

function App() {

  const [backendData, setBackendData] = useState<Message[] | null>(null)

  useEffect(() => {
    fetch("http://localhost:3000/api").then(
      response => response.json()
    ).then(
      data => setBackendData(data)
    )
  })

  return (
    <div>
      {
        (backendData === null) 
        ? (
          <p> Loading... </p>
        ) : (
          backendData.map((message, i) => (
            <p key={i}>
              {message.message}
            </p>
          ))
        )
      }
    </div>
  )
}

export default App