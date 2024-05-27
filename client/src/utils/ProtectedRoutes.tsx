import React from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes() {
  const { userLoggedIn } = useAuth()
  return (
    userLoggedIn
    ? <Outlet/>
    : <Navigate to="/login"/>
  )
}

export default ProtectedRoutes