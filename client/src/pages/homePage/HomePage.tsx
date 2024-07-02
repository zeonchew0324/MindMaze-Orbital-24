import React, { useState } from 'react'
import { doSignOut } from '../../firebase/auth'
import { useNavigate } from 'react-router-dom'
import Maze from '../../components/maze/Maze'

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
    <div>
      <button
        className="absolute z-50 bottom-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={(e) => onSignOut(e)}
      >
        Sign out
      </button>
      <div className="relative min-h-screen flex flex-col justify-center">
        <h1 className="relative text-xl p-4">Welcome Back!</h1>
        <Maze/>
      </div>
    </div>
  );
}

export default HomePage