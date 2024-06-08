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
import Layout from '../components/layout/Layout'
import TodoPage from '../pages/todoPage/TodoPageNew'


function RouteHandler() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/reset-password" element={<ResetPasswordPage/>} />

      <Route element = {<ProtectedRoutes />}>
        <Route path="/home" element={<Layout><HomePage/></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage/></Layout>} />
        <Route path="/habits" element={<Layout><HabitsPage/></Layout>} />
        <Route path="/timetable" element={<Layout><TimetablePage/></Layout>} />
        <Route path="/todo" element={<Layout><TodoPage/></Layout>} />
      </Route>
      
    </Routes>
  )
}

export default RouteHandler