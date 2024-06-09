import React, { useEffect, useState } from 'react'
import RouteHandler from './routes/RouteHandler'
import AuthProvider from './contexts/AuthProvider'
import { HabitsProvider } from './contexts/HabitsProvider'

function App() {
  return (
    <HabitsProvider>
      <AuthProvider>
        <RouteHandler/>
      </AuthProvider>
    </HabitsProvider>
    
    
  )
}

export default App