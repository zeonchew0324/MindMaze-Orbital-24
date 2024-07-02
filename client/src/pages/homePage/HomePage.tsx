import React, { useState } from 'react'
import { doSignOut } from '../../firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'
import DashboardHabits from '../../components/dashboard/DashboardHabits'
import DashboardTodos from '../../components/dashboard/DashboardTodos'


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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="min-h-[400px]">
          <DashboardHabits />
        </div>
        <div className="min-h-[400px]">
          <DashboardTodos />
        </div>
      </div>
      <button onClick={(e) => onSignOut(e)}> Sign out </button>;
    </div>


    
  )
}

export default HomePage