import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from "react"
import { auth } from "../firebase/firebase-config"
import { User, onAuthStateChanged } from 'firebase/auth'

type AuthContextType = {
  currentUser: User | null,
  userLoggedIn: boolean,
  loading: boolean
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({ 
  currentUser: null,
  userLoggedIn: false,
  loading: false
})

export function useAuth(): AuthContextType{
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    console.log(`detected change: ${userLoggedIn}`)
    return unsubscribe
  }, [])

  function initializeUser(user: User | null): void{ //ANY to be changed
    if (user) {
      setCurrentUser(user)
      setUserLoggedIn(true)
    } else {
      setCurrentUser(null)
      setUserLoggedIn(false)
    }
    setLoading(false)
  }

  const value: AuthContextType = {
    currentUser,
    userLoggedIn,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}