import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateAISongRecommendations, generateYouTubeSearchUrl } from "@/services/aiService"
import { trackMoodSelection, trackSongActivity } from "@/services/userActivityService"

// Simple SVG icons
const MusicIcon = () => (
  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
)

const PlayIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
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

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
)

const CategorySongs = ({ onNavigate, onLogout, category }) => {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [savedItems, setSavedItems] = useState([])
  const [categorySelectionCount, setCategorySelectionCount] = useState({})

  // Category metadata
  const categoryData = {
    'Spiritual': {
      icon: '🧘',
      description: 'Meditative and peaceful tracks'
    },
    'Mood Based': {
      icon: '😊',
      description: 'Songs based on your current mood'
    },
    'Travelling': {
      icon: '✈️',
      description: 'Perfect songs for your journey'
    },
    'Party': {
      icon: '🎉',
      description: 'High-energy party anthems'
    },
    'Rock': {
      icon: '🎸',
      description: 'Classic and modern rock hits'
    }
  }

  // Fetch AI-generated songs for the category
  const fetchAISongs = async (refreshKey = 0) => {
    setLoading(true)
    console.log(`CategorySongs: Fetching songs for category "${category}" with refreshKey ${refreshKey}`);
    try {
      const recommendations = await generateAISongRecommendations(null, category, refreshKey)
      setSongs(recommendations)
      console.log(`AI-generated ${category} songs (selection #${refreshKey + 1}):`, recommendations)

      // Track category selection to database
      try {
        await trackMoodSelection({
          mood_type: category,
          emoji: categoryData[category]?.icon || '🎵',
          energy_level: null,
          stress_level: null,
          note: `Selected ${category} category - got ${recommendations.length} songs`
        })
        console.log('Category selection tracked to database')
      } catch (trackError) {
        console.warn('Failed to track category selection:', trackError)
      }
    } catch (error) {
      console.error('Error getting AI recommendations:', error)
      setSongs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initialize selection count for this category
    const currentCount = categorySelectionCount[category] || 0
    fetchAISongs(currentCount)
  }, [category])

  const handleRefreshSongs = () => {
    const newCount = (categorySelectionCount[category] || 0) + 1
    setCategorySelectionCount(prev => ({ ...prev, [category]: newCount }))
    fetchAISongs(newCount)
  }

  const handleSaveItem = (song) => {
    if (!savedItems.includes(song.title)) {
      setSavedItems([...savedItems, song.title])
    }
  }

  const handleShare = (song) => {
    if (navigator.share) {
      navigator.share({
        title: song.title,
        text: `Check out this song: ${song.title} by ${song.artist}`,
        url: window.location.href
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${song.title} - ${song.artist}`)
      alert('Song details copied to clipboard!')
    }
  }

  const handlePlaySong = async (song) => {
    try {
      // Open YouTube URL
      if (song.youtube_url && song.youtube_url !== "https://www.youtube.com/watch?v=U7Idt8P8u5o") {
        // Use direct YouTube URL if available and not placeholder
        console.log('Opening YouTube URL:', song.youtube_url);
        window.open(song.youtube_url, '_blank', 'noopener,noreferrer');
      } else {
        // Fallback to YouTube search if no direct URL or placeholder
        const searchUrl = generateYouTubeSearchUrl(song.title, song.artist)
        console.log('Opening YouTube search:', searchUrl);
        window.open(searchUrl, '_blank', 'noopener,noreferrer');
      }

      // Track song play activity to database
      try {
        await trackSongActivity({
          song_title: song.title,
          artist: song.artist,
          category: category,
          activity_type: 'play',
          note: `Played ${song.title} by ${song.artist} from ${category} category`
        })
        console.log('Song play activity tracked to database')
      } catch (trackError) {
        console.warn('Failed to track song activity:', trackError)
      }
    } catch (error) {
      console.error('Error playing song:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {category} songs...</p>
        </div>
      </div>
    )
  }

  const categoryInfo = categoryData[category] || { icon: '🎵', description: 'Music collection' }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
                <ArrowLeftIcon className="mr-2" />
                Back to Dashboard
              </Button>
              <MusicIcon />
              <span className="text-xl font-bold text-gray-900">MoodTune</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onLogout} className="border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{categoryInfo.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{category} Songs</h1>
          <p className="text-gray-600 text-lg mb-4">{categoryInfo.description}</p>
          <div className="flex items-center justify-center space-x-4">
            <Button 
              onClick={handleRefreshSongs}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={loading}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
              Get Different Songs
            </Button>
            <p className="text-sm text-gray-500 italic">Click to get more {category.toLowerCase()} songs</p>
          </div>
        </div>

        {/* Songs List */}
        <div className="space-y-4">
          {songs.map((song, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MusicIcon />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg">{song.title}</h4>
                      <p className="text-gray-600">{song.artist} • {song.duration}</p>
                      <p className="text-gray-500 text-sm">{song.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSaveItem(song)}
                      className={savedItems.includes(song.title) ? "text-purple-600" : "text-gray-400"}
                    >
                      <BookmarkIcon />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare(song)}>
                      <Share2Icon />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handlePlaySong(song)}
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Play
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {songs.length === 0 && !loading && (
          <div className="text-center py-12">
            <MusicIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No AI-generated songs found</h3>
            <p className="text-gray-600">Try refreshing to get different {category.toLowerCase()} songs.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategorySongs
