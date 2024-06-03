import React, { useState } from 'react'
import { doSignOut } from '../../firebase/auth'
import { useNavigate } from 'react-router-dom'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

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

  const signOutbutton = 
                  <button onClick={(e) => onSignOut(e)}> 
                  Sign out 
                  </button>;
                  
  
  //add navigation bar on top, profile; dashboard(main); habits; timetable; to-do


  return (
    <>
      <p>Welcome Back!</p>

      
    </>
  )
}

export default HomePage