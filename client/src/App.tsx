import React, { useEffect, useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'

import LoginPage from './pages/loginPage/LoginPage'
import SignupPage from './pages/signupPage/SignupPage'
import ResetPasswordPage from './pages/resetPasswordPage/ResetPasswordPage'

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
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/reset-password" element={<ResetPasswordPage/>} />
    </Routes>
  )
}

export default App