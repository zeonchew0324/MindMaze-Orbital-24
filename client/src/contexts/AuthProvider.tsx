import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from "react"
import { auth } from "../firebase/firebase-config"
import { User, onAuthStateChanged } from 'firebase/auth'
import { AuthStatus, AuthProviderProps } from '../types/auth'

const AuthContext = createContext<AuthStatus>({ 
  currentUser: null,
  userLoggedIn: false,
  loading: false,
  token: '',
})

export function useAuth(): AuthStatus{
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    console.log(`detected change: ${userLoggedIn}`)
    return unsubscribe
  }, [])

  function initializeUser(user: User | null): void{
    if (user) {
      setCurrentUser(user)
      setUserLoggedIn(true)
      user.getIdToken().then((token) => {
        setToken(token)
      })
    } else {
      setCurrentUser(null)
      setUserLoggedIn(false)
      setToken('')
    }
    setLoading(false)
  }

  const value: AuthStatus = {
    currentUser,
    userLoggedIn,
    loading,
    token,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}