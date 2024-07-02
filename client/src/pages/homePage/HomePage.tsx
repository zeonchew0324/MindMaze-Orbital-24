import React, { useState } from 'react'
import { doSignOut } from '../../firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'
import DashboardHabit from '../../components/dashboard/dashboardhabits'
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Welcome Back</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <DashboardHabit />
        </div>
        <div className="w-full md:w-1/2">
          <DashboardTodos />
        </div>
      </div>
    </div>

    
  )
}

export default HomePage