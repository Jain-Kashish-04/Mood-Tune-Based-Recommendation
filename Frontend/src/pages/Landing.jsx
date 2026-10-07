import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Simple SVG icons
const MusicIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
)

const HeartIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

const BrainIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </svg>
)

const UsersIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
  </svg>
)

const Landing = ({ onNavigate }) => {
  const [currentMood, setCurrentMood] = useState("")

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 border-yellow-300" },
    { emoji: "😢", label: "Sad", color: "bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 border-blue-300" },
    { emoji: "😡", label: "Angry", color: "bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 border-red-300" },
    { emoji: "😰", label: "Anxious", color: "bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 border-purple-300" },
    { emoji: "😴", label: "Tired", color: "bg-gradient-to-r from-gray-400 to-slate-400 hover:from-gray-500 hover:to-slate-500 border-gray-300" },
    { emoji: "🤗", label: "Excited", color: "bg-pink-100 hover:bg-pink-200 border-pink-300" }
  ]

  const features = [
    {
      icon: HeartIcon,
      title: "Personalized Music",
      description: "Get music recommendations that match your current mood perfectly"
    },
    {
      icon: BrainIcon,
      title: "Activity Suggestions", 
      description: "Discover activities that can help improve your emotional state"
    },
    {
      icon: TrendingUpIcon,
      title: "AI-Powered Analysis",
      description: "Advanced sentiment analysis to understand your emotional patterns"
    },
    {
      icon: UsersIcon,
      title: "Mood Tracking",
      description: "Monitor your emotional trends over time with beautiful analytics"
    },
    {
      icon: ShieldIcon,
      title: "Community Support",
      description: "Connect with others and share experiences in a safe environment"
    },
    {
      icon: MusicIcon,
      title: "Privacy First",
      description: "Your data is secure and protected with enterprise-grade encryption"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <MusicIcon />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MoodTune
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => onNavigate("auth")} 
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200"
                variant="ghost"
              >
                Login
              </Button>
              <Button 
                onClick={() => onNavigate("auth")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Your Personal Mood-Based Music Companion
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the perfect music for every mood. Get personalized recommendations, 
            track your emotional journey, and connect with music that understands you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate("auth")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Your Journey
            </Button>
            <Button 
              onClick={() => onNavigate("auth")}
              className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Everything You Need for
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Emotional Wellness
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Powerful features designed to help you understand and improve your emotional state
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <feature.icon />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Selector Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            How Are You Feeling Today?
          </h2>
          <p className="text-lg text-gray-600">
            Select your current mood to get personalized music recommendations
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {moods.map((mood, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentMood(mood.label)
                onNavigate("recommendations", { mood: mood.label })
              }}
              className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${mood.color} ${currentMood === mood.label ? 'ring-4 ring-indigo-500 ring-offset-2' : ''}`}
            >
              <div className="text-4xl mb-2 text-center">{mood.emoji}</div>
              <p className="text-sm font-medium text-center text-gray-700">{mood.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Musical Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of users who have transformed their emotional wellness with MoodTune
          </p>
          <Button 
            onClick={() => onNavigate("auth")}
            className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Landing
