import React, { useState } from 'react'
import { doSignOut } from '../../firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'


function HomePage() {

  const [errMessage, setErrMessage] = useState('')
  const [isSigningOut, setIsSigningOut] = useState(false)
  const navigate = useNavigate()

  const { token } = useAuth()
  const onSignOut = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSigningOut) {
      setIsSigningOut(true)
      try {
        await doSignOut();
        navigate('/login')
      } catch (error) {
        if (error instanceof Error) {
          setErrMessage(error.message)
        }
        setIsSigningOut(false) // Reset signing-in state
      }
    }
  }

  return (
    <>
      <h1 className='text-8xl'>Welcome Back!</h1>
      <button onClick={(e) => onSignOut(e)}> Sign out </button>;

    </>
  )
}

export default HomePage