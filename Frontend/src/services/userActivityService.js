const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Debug: Check if environment variables are loading
console.log('Environment variables:', {
  API_BASE_URL: API_BASE_URL,
  importMetaEnv: import.meta.env,
  NODE_ENV: import.meta.env.MODE
});
const getAuthToken = () => {
  return localStorage.getItem('moodtune_token')
}

// Generic API request helper with error handling
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken()
  const headers = {
    'Content-Type': 'application/json',
  }

  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, clear local storage
        localStorage.removeItem('moodtune_token')
        localStorage.removeItem('moodtune_user')
        throw new Error('Authentication expired. Please login again.')
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

// Track mood selection
export const trackMoodSelection = async (mood, notes = '') => {
  try {
    const response = await apiRequest('/user-activity/mood', {
      method: 'POST',
      body: JSON.stringify({ mood, notes })
    })

    return await response.json()
  } catch (error) {
    console.error('Error tracking mood selection:', error)
    throw error
  }
}

// Track song activity
export const trackSongActivity = async (songData, activityType = 'play') => {
  try {
    const response = await apiRequest('/user-activity/song', {
      method: 'POST',
      body: JSON.stringify({ ...songData, activity_type: activityType })
    })

    return await response.json()
  } catch (error) {
    console.error('Error tracking song activity:', error)
    throw error
  }
}

// Get user activity history
export const getUserActivityHistory = async () => {
  try {
    const response = await apiRequest('/user-activity/history')
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching user history:', error)
    throw error
  }
}

// Get user analytics
export const getUserAnalytics = async () => {
  try {
    const response = await apiRequest('/user-activity/analytics')
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching user analytics:', error)
    throw error
  }
}

// Export user history
export const exportHistory = async () => {
  try {
    const response = await apiRequest('/user-activity/export')
    
    return await response.json()
  } catch (error) {
    console.error('Error exporting history:', error)
    throw error
  }
}

// Get user's mood analytics
export const getMoodAnalytics = async (days = 30) => {
  try {
    const response = await apiRequest(`/moods/analytics?days=${days}`)
    return response
  } catch (error) {
    console.error('Error fetching mood analytics:', error)
    return null
  }
}

// Get user's mood history
export const getMoodHistory = async (limit = 50, offset = 0) => {
  try {
    const response = await apiRequest(`/moods/history?limit=${limit}&offset=${offset}`)
    return response
  } catch (error) {
    console.error('Error fetching mood history:', error)
    return []
  }
}
