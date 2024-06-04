import React, { useEffect } from 'react'
import axios from 'axios'
import { AuthTokenProp } from '../../types/auth'

function TestBackendAuth({ token }: AuthTokenProp) {

  useEffect(() => {
    if (token) {
      console.log('fetching data from api...')
      fetchData(token)
    }
  }, [token])

  const fetchData = async (token: string) => {
    const res = await axios.get('http://localhost:5000/api', {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }).then(res => console.log(res.data)).catch(e => console.log(e))
  }

  return (
    <div>
      TestBackendAuth
    </div>
  )
}

export default TestBackendAuth