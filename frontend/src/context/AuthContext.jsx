import React, { createContext, useContext, useState } from 'react'

// Create context
const AuthContext = createContext()

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to consume the context
export function useAuth() {
  return useContext(AuthContext)
}
