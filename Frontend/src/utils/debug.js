// Debug utility to help identify blank screen issues
export const debugLog = (message, data = null) => {
  console.log(`[MoodTune Debug] ${message}`, data)
}

export const debugError = (message, error = null) => {
  console.error(`[MoodTune Error] ${message}`, error)
}

// Log app initialization
debugLog('App initializing...')

// Log environment variables
debugLog('Environment', {
  API_URL: process.env.REACT_APP_API_URL,
  NODE_ENV: process.env.NODE_ENV
})

// Log browser info
debugLog('Browser info', {
  userAgent: navigator.userAgent,
  language: navigator.language,
  platform: navigator.platform
})
