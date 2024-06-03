import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/loginPage/LoginPage'
import ResetPasswordPage from '../pages/resetPasswordPage/ResetPasswordPage'
import SignupPage from '../pages/signupPage/SignupPage'
import HomePage from '../pages/homePage/HomePage'
import ProtectedRoutes from '../utils/ProtectedRoutes'
import HabitsPage from '../pages/habitsPage/HabitsPage'
import ProfilePage from '../pages/profilePage/ProfilePage'
import TimetablePage from '../pages/timetablePage/TimetablePage'


function RouteHandler() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/reset-password" element={<ResetPasswordPage/>} />
      <Route path="/habits" element={<HabitsPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/timetable" element={<TimetablePage/>} />
    
      <Route path="/" element={<ProtectedRoutes/>}>
        <Route path="/home" element={<HomePage/>} />
      </Route>
    </Routes>
  )
}

export default RouteHandler