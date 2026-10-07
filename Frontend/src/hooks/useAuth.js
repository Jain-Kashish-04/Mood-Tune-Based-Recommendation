import { useState, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = () => {
      const token = localStorage.getItem('moodtune_token')
      const userData = localStorage.getItem('moodtune_user')
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error('Error parsing user data:', error)
          localStorage.removeItem('moodtune_token')
          localStorage.removeItem('moodtune_user')
        }
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      // Store token and user data
      localStorage.setItem('moodtune_token', data.token)
      localStorage.setItem('moodtune_user', JSON.stringify(data.user))
      
      setUser(data.user)
      return { success: true, user: data.user }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        
        if (errorData.error === 'Email already exists') {
          throw new Error('Email already exists')
        }
        
        throw new Error(`Registration failed: ${response.status} ${errorData.error || response.statusText}`)
      }

      const data = await response.json()
      
      // Store token and user data
      localStorage.setItem('moodtune_token', data.token)
      localStorage.setItem('moodtune_user', JSON.stringify(data.user))
      
      setUser(data.user)
      return { success: true, user: data.user }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('moodtune_token')
    localStorage.removeItem('moodtune_user')
    setUser(null)
  }

  return {
    user,
    loading,
    login,
    register,
    logout
  }
}
