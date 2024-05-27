import React, { useEffect, useState } from 'react'
import RouteHandler from './routes/RouteHandler'
import AuthProvider from './contexts/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <RouteHandler/>
    </AuthProvider>
    
  )
}

export default App