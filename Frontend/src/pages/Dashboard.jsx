import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserAnalytics, trackMoodSelection } from "@/services/userActivityService"
import { useAuth } from "@/hooks/useAuth"

// Simple SVG icons
const MusicIcon = () => (
  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
)

const HeartIcon = () => (
  <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

const BrainIcon = () => (
  <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </svg>
)

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
)

const BookmarkIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
  </svg>
)

const Share2Icon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
  </svg>
)

const SmileIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.99 2C6.47 2 2 6.47 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5.5-2.5l.79-.78c.39.39.79.74 1.22 1.04l-.79.79c-.52-.31-1.01-.68-1.46-1.1zM7.5 9.5c.83 0 1.5-.67 1.5-1.5S8.33 6.5 7.5 6.5 6 7.17 6 8s.67 1.5 1.5 1.5zm4.5 4.5c-1.83 0-3.46-.71-4.69-1.87l-.81.8C7.96 14.31 9.86 15.1 12 15.1s4.04-.79 5.5-2.17l-.81-.8c-1.23 1.16-2.86 1.87-4.69 1.87zm4.5-4.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S15 7.17 15 8s.67 1.5 1.5 1.5z"/>
  </svg>
)

const Dashboard = ({ onNavigate, onLogout }) => {
  const { user } = useAuth()
  const [moodInput, setMoodInput] = useState("")
  const [energyLevel, setEnergyLevel] = useState(5)
  const [stressLevel, setStressLevel] = useState(5)
  const [analytics, setAnalytics] = useState(null)
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)

  // Load user's real data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true)
        
        // Get user's analytics
        const analyticsData = await getUserAnalytics()
        setAnalytics(analyticsData.analytics || {
          total_entries: 0,
          active_days: 0,
          total_songs: 0,
          unique_songs: 0,
          current_streak: 0,
          this_week_entries: 0,
          mood_breakdown: []
        })

        // Get user's recent activities
        const historyData = await getUserActivityHistory()
        setRecentActivities(historyData.activities || [])

      } catch (error) {
        console.error('Error loading user data:', error)
        // Set default empty state for new users
        setAnalytics({
          total_entries: 0,
          active_days: 0,
          total_songs: 0,
          unique_songs: 0,
          current_streak: 0,
          this_week_entries: 0,
          mood_breakdown: []
        })
        setRecentActivities([])
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadUserData()
    } else {
      setLoading(false)
    }
  }, [user])

  // New categories instead of moods
  const categories = [
    { 
      icon: '🧘', 
      label: 'Spiritual', 
      color: 'bg-purple-100 border-purple-300 hover:bg-purple-200',
      description: 'Meditative and peaceful tracks'
    },
    { 
      icon: '�', 
      label: 'Mood Based', 
      color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200',
      description: 'Songs based on your current mood'
    },
    { 
      icon: '✈️', 
      label: 'Travelling', 
      color: 'bg-blue-100 border-blue-300 hover:bg-blue-200',
      description: 'Perfect songs for your journey'
    },
    { 
      icon: '🎉', 
      label: 'Party', 
      color: 'bg-pink-100 border-pink-300 hover:bg-pink-200',
      description: 'High-energy party anthems'
    },
    { 
      icon: '🎸', 
      label: 'Rock', 
      color: 'bg-red-100 border-red-300 hover:bg-red-200',
      description: 'Classic and modern rock hits'
    }
  ]

  const handleCategorySelect = (category) => {
    // Navigate to the category songs page
    onNavigate("category-songs", { category: category.label });
  }

  const handleMoodSubmit = async () => {
    if (moodInput.trim()) {
      try {
        // Track mood with energy and stress levels
        await trackMoodSelection(moodInput, `Energy: ${energyLevel}/10, Stress: ${stressLevel}/10`)
        
        // Clear form and navigate to recommendations
        setMoodInput("")
        setEnergyLevel(5)
        setStressLevel(5)
        onNavigate("recommendations")
      } catch (error) {
        console.error('Error tracking mood:', error)
        // Show error message to user
        alert('Failed to track mood. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          border: none;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
      `}</style>
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MusicIcon />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  MoodTune
                </span>
              </div>
              <div className="hidden md:flex space-x-6">
                <button className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">
                  Dashboard
                </button>
                <button 
                  onClick={() => onNavigate("history")}
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
                >
                  History
                </button>
                <button 
                  onClick={() => onNavigate("analytics")}
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
                >
                  Analytics
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user?.name?.[0] || 'U'}
                    </span>
                  </div>
                </button>
              </div>
              <button 
                onClick={onLogout}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-bold text-white">
                    {recentActivities[0]?.mood?.[0] || '😊'}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                  Welcome back, {user?.name || 'User'}!
                </h1>
                <p className="text-lg text-gray-600">
                  {recentActivities[0]?.mood ? `Current mood: ${recentActivities[0].mood}` : 'How are you feeling today?'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Quick Stats Cards */}
          <div className="flex space-x-4">
            {/* Current Mood Card */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">
                    {recentActivities[0]?.mood?.[0] || '😊'}
                  </span>
                </div>
                <div className="text-white">
                  <p className="text-xs font-medium opacity-90">Current Mood</p>
                  <p className="text-lg font-bold">
                    {recentActivities[0]?.mood || 'Not Set'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Streak Card */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="text-white">
                  <p className="text-xs font-medium opacity-90">Current Streak</p>
                  <p className="text-lg font-bold">
                    {loading ? '...' : analytics?.current_streak || 0} days
                  </p>
                </div>
              </div>
            </div>
            
            {/* Recommendations Card */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                 onClick={() => onNavigate("recommendations")}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎵</span>
                </div>
                <div className="text-white">
                  <p className="text-xs font-medium opacity-90">Recommendations</p>
                  <p className="text-lg font-bold">
                    {loading ? '...' : analytics?.total_songs || 0} songs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2"></div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Total Entries</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {loading ? '...' : analytics?.total_entries || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">All time activities</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CalendarIcon />
                </div>
              </div>
            </div>
          </div>
          
          <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2"></div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">This Week</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {loading ? '...' : analytics?.this_week_entries || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ClockIcon />
                </div>
              </div>
            </div>
          </div>
          
          <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2"></div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Current Streak</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {loading ? '...' : analytics?.current_streak || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Days in a row</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUpIcon />
                </div>
              </div>
            </div>
          </div>
          
          <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2"></div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Total Songs</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    {loading ? '...' : analytics?.total_songs || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Music played</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MusicIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* Category Selector */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Choose Your Vibe
              </h2>
              <p className="text-gray-600">Select a category to discover personalized music recommendations</p>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow-lg animate-pulse">
              New Releases
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategorySelect(category)}
                className={`group cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${category.color}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.label}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

            {/* Mood Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  How Are You Feeling?
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Live</span>
                </div>
              </div>
              
              {/* Energy Level */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Energy Level: <span className="text-indigo-600 font-bold">{energyLevel}/10</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>😴 Low</span>
                    <span>⚡ High</span>
                  </div>
                </div>
              </div>

              {/* Stress Level */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Stress Level: <span className="text-purple-600 font-bold">{stressLevel}/10</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stressLevel}
                    onChange={(e) => setStressLevel(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>😌 Calm</span>
                    <span>😰 Stressed</span>
                  </div>
                </div>
              </div>

              {/* Text Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Describe Your Mood
                </label>
                <textarea
                  value={moodInput}
                  onChange={(e) => setMoodInput(e.target.value)}
                  placeholder="What's on your mind? How are you feeling today? Be as detailed as you want..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200 text-gray-700"
                  rows={4}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{moodInput.length}/500 characters</span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleMoodSubmit}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
                disabled={!moodInput.trim()}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>Log Mood & Get Recommendations</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Button>
            </div>
          </div>

              {/* Recent Activities */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Your Mood Journey
                </h2>
                <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-semibold">
                  {recentActivities.length} Activities
                </div>
              </div>
              <div className="space-y-4">
                {recentActivities.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No activities yet</h3>
                    <p className="text-gray-500">Start by logging your mood above!</p>
                  </div>
                ) : (
                  recentActivities.map((activity, index) => (
                    <div key={index} className="group flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-lg font-bold text-white">
                          {activity.activity_data?.mood?.[0] || activity.mood?.[0] || '😊'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {activity.activity_data?.mood || activity.mood || 'Unknown'}
                          </h4>
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                            {new Date(activity.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {activity.activity_data?.notes || activity.note || 'No notes'}
                        </p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-xs text-indigo-600 font-medium">
                            {activity.activity_type === 'mood_selection' ? '🎭 Mood' : '🎵 Song'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(activity.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {recentActivities.length > 0 && (
                <Button 
                  onClick={() => onNavigate("history")}
                  className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>View Complete History</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
