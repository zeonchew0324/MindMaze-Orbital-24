import React, { useEffect } from 'react'
import axios from 'axios'
import { AuthTokenProp } from '../../types/auth'

function TestBackendAuth({ token }: AuthTokenProp) {
  useEffect(() => {
    if (token) {
      fetchData(token)
    }
  }, [token])

  const fetchData = async (token: string) => {
    const res = await axios.get('http://localhost:5000/api', {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
  }

  return (
    <div>
      TestBackendAuth
    </div>
  )
}

export default TestBackendAuth