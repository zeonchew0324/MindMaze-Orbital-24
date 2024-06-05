import React, { useEffect } from 'react'
import axios from 'axios'
import { AuthTokenProp } from '../../types/auth'

function TestBackendAuth({ token }: AuthTokenProp) {

  const fetchData = async (token: string) => {
    const res = await axios.get('http://localhost:5000/api', {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }).then(res => console.log(res.data)).catch(e => console.log(e))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetchData(token);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  return (
    <div>
      <button onClick={event => onSubmit(event)}>Send request to API test</button>
    </div>
  )
}

export default TestBackendAuth