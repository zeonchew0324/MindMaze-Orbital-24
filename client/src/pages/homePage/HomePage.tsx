import React, { useState } from 'react'
import { doSignOut } from '../../firebase/auth'
import { useNavigate } from 'react-router-dom'


function HomePage() {

  const [errMessage, setErrMessage] = useState('')
  const [isSigningOut, setIsSigningOut] = useState(false)
  const navigate = useNavigate()

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
      <p>Welcome Back!</p>
      <button onClick={(e) => onSignOut(e)}> Sign out </button>;
    </>
  )
}

export default HomePage