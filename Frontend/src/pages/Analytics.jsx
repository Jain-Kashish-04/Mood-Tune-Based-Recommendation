import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Simple SVG icons
const MusicIcon = () => (
  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
)

const BarChart3Icon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4 4h2v14h-2zm4-2h2v16h-2z"/>
  </svg>
)

const PieChartIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/>
  </svg>
)

const ActivityIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
  </svg>
)

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
)

const FilterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
  </svg>
)

const Analytics = ({ onNavigate, onLogout }) => {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("moods")

  // Mock data
  const moodData = [
    { date: "2024-03-01", mood: "Happy", score: 8 },
    { date: "2024-03-02", mood: "Anxious", score: 4 },
    { date: "2024-03-03", mood: "Happy", score: 7 },
    { date: "2024-03-04", mood: "Tired", score: 3 },
    { date: "2024-03-05", mood: "Happy", score: 9 },
    { date: "2024-03-06", mood: "Sad", score: 4 },
    { date: "2024-03-07", mood: "Happy", score: 8 },
  ]

  const moodDistribution = [
    { mood: "Happy", count: 12, percentage: 40, color: "bg-yellow-400" },
    { mood: "Anxious", count: 6, percentage: 20, color: "bg-purple-400" },
    { mood: "Sad", count: 5, percentage: 17, color: "bg-blue-400" },
    { mood: "Tired", count: 4, percentage: 13, color: "bg-gray-400" },
    { mood: "Angry", count: 3, percentage: 10, color: "bg-red-400" }
  ]

  const insights = [
    {
      title: "Most Common Mood",
      value: "Happy",
      change: "+15% from last month",
      trend: "up",
      icon: "😊"
    },
    {
      title: "Average Mood Score",
      value: "7.2/10",
      change: "+0.8 from last month",
      trend: "up",
      icon: "📈"
    },
    {
      title: "Mood Consistency",
      value: "65%",
      change: "+5% from last month",
      trend: "up",
      icon: "🎯"
    },
    {
      title: "Entries This Month",
      value: "30",
      change: "+8 from last month",
      trend: "up",
      icon: "📝"
    }
  ]

  const exportData = () => {
    console.log("Exporting analytics data...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <MusicIcon />
              <span className="text-xl font-bold text-gray-900">MoodTune</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => onNavigate("dashboard")} className="text-gray-600 hover:text-purple-600">
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => onNavigate("history")} className="text-gray-600 hover:text-purple-600">
                History
              </Button>
              <Button variant="outline" onClick={onLogout} className="border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mood Analytics</h1>
              <p className="text-gray-600">Track your emotional patterns and gain insights</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button 
                variant="outline" 
                onClick={exportData}
                className="border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600"
              >
                <DownloadIcon className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {insights.map((insight, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{insight.icon}</span>
                  <div className={`flex items-center text-sm ${
                    insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUpIcon className="w-4 h-4 mr-1" />
                    {insight.change}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{insight.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{insight.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mood Trend Chart */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <ActivityIcon className="mr-2" />
                Mood Trend
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your mood scores over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3Icon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization would go here</p>
                  <p className="text-sm text-gray-400">Showing mood scores from {timeRange}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mood Distribution */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <PieChartIcon className="mr-2" />
                Mood Distribution
              </CardTitle>
              <CardDescription className="text-gray-600">
                How your moods are distributed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moodDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{item.mood}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

            {/* Weekly Pattern */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <CalendarIcon className="mr-2" />
                Weekly Pattern
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your average mood by day of the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3Icon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Weekly pattern chart</p>
                  <p className="text-sm text-gray-400">Best day: Friday (8.2/10)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <TrendingUpIcon className="mr-2" />
                AI Insights
              </CardTitle>
              <CardDescription className="text-gray-600">
                Personalized recommendations based on your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <h4 className="font-medium text-purple-900 mb-2">🌟 Peak Performance</h4>
                  <p className="text-sm text-purple-700">Your mood is consistently highest on Friday afternoons. Consider scheduling important activities then.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-900 mb-2">🎯 Stress Pattern</h4>
                  <p className="text-sm text-blue-700">You tend to feel more anxious on Monday mornings. Try starting the week with meditation.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="font-medium text-green-900 mb-2">💪 Progress</h4>
                  <p className="text-sm text-green-700">Your overall mood has improved by 23% this month. Keep up the great work!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Analytics
