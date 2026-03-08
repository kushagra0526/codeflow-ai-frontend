"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api, User } from './api'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (leetcode_username: string, password: string) => Promise<void>
  register: (leetcode_username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = api.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (leetcode_username: string, password: string = '') => {
    try {
      console.log('Logging in with username:', leetcode_username)

      // Create mock profile data (LeetCode API has CORS in browser)
      const localUser: User = {
        user_id: `user-${leetcode_username}`,
        leetcode_username: leetcode_username,
        language_preference: 'en'
      }

      setUser(localUser)

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(localUser))
      }

      console.log('Login successful')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const register = async (leetcode_username: string, email: string = '', password: string = '') => {
    try {
      console.log('Registering user:', leetcode_username)

      // Create local user
      const localUser: User = {
        user_id: `user-${leetcode_username}`,
        leetcode_username: leetcode_username,
        language_preference: 'en'
      }

      setUser(localUser)

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(localUser))
      }

      console.log('Registration successful')
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  const logout = () => {
    api.clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
