import { createContext, useContext, useState, useEffect } from 'react'
import AuthService from '../services/AuthService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    const data = await AuthService.login(credentials)
    setUser(data.user)
    return data
  }

  const register = async (userData) => {
    const data = await AuthService.register(userData)
    return data
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider')
  }
  return context
}

export default AuthContext