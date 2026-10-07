import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getUserActivityHistory } from "@/services/userActivityService"

// Simple SVG icons
const MusicIcon = () => (
  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
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

const EditIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
)

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
)

const PlayIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
)

const History = ({ onNavigate, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMood, setFilterMood] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivityHistory()
  }, [])

  const fetchActivityHistory = async () => {
    try {
      setLoading(true)
      const history = await getUserActivityHistory(100)
      setActivities(history)
    } catch (error) {
      console.error('Error fetching activity history:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = searchTerm === "" || 
      (activity.type === 'mood' && activity.mood_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (activity.type === 'song' && activity.song_title.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesMood = filterMood === "" || 
      (activity.type === 'mood' && activity.mood_type === filterMood)
    
    const matchesDate = filterDate === "" || 
      new Date(activity.created_at).toISOString().split('T')[0] === filterDate
    
    return matchesSearch && matchesMood && matchesDate
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (activity) => {
    if (activity.type === 'mood') {
      return <div className="text-2xl">{activity.emoji || '😊'}</div>
    } else if (activity.type === 'song') {
      return <MusicIcon />
    }
    return <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
  }

  const deleteEntry = (id) => {
    console.log("Delete entry:", id)
  }

  const editEntry = (id) => {
    console.log("Edit entry:", id)
  }

  const exportHistory = () => {
    console.log("Exporting history...")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your activity history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate("dashboard")}
                className="text-gray-600 hover:text-purple-600 mr-4"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Dashboard
              </Button>
              <MusicIcon />
              <span className="text-xl font-bold text-gray-900">MoodTune</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => onNavigate("dashboard")} className="text-gray-600 hover:text-purple-600">
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => onNavigate("recommendations")} className="text-gray-600 hover:text-purple-600">
                Recommendations
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Activity History</h1>
              <p className="text-gray-600">Track your mood selections and song plays over time</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={exportHistory}
                className="border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600"
              >
                <DownloadIcon className="mr-2" />
                Export
              </Button>
              <Button onClick={() => onNavigate("recommendations")} className="bg-purple-600 hover:bg-purple-700 text-white">
                Add New Entry
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Activities</p>
                  <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CalendarIcon />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Mood Selections</p>
                  <p className="text-2xl font-bold text-gray-900">{activities.filter(a => a.type === 'mood').length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">😊</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Songs Played</p>
                  <p className="text-2xl font-bold text-gray-900">{activities.filter(a => a.type === 'song').length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MusicIcon />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Filtered Results</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredActivities.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <Input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Mood</label>
              <select
                value={filterMood}
                onChange={(e) => setFilterMood(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Moods</option>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Angry">Angry</option>
                <option value="Anxious">Anxious</option>
                <option value="Tired">Tired</option>
                <option value="Excited">Excited</option>
                <option value="Calm">Calm</option>
                <option value="Confused">Confused</option>
                <option value="Confident">Confident</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Date</label>
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Activities List */}
        {filteredActivities.length > 0 ? (
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => (
              <Card key={`${activity.type}-${activity.id || index}`} className={`border ${
                activity.type === 'mood' ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {activity.type === 'mood' ? (
                            <>Selected {activity.mood_type} mood</>
                          ) : (
                            <>Played {activity.song_title}</>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {activity.type === 'mood' ? (
                            activity.note
                          ) : (
                            <>by {activity.artist} • {activity.category}</>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(activity.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {activity.type === 'song' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(activity.song_title + ' ' + activity.artist)}`;
                            window.open(searchUrl, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          <PlayIcon className="w-4 h-4 mr-1" />
                          Play
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => editEntry(activity.id)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteEntry(activity.id)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
            <p className="text-gray-600">Start selecting moods and playing songs to see your history here.</p>
            <Button 
              onClick={() => onNavigate("recommendations")}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default History
