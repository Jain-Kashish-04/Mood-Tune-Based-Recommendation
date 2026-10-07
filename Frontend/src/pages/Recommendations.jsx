import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateAISongRecommendations, generateYouTubeSearchUrl, generateAIQuotes } from "@/services/aiService"
import { trackMoodSelection, trackSongActivity, getUserActivityHistory } from "@/services/userActivityService"

// Simple SVG icons
const MusicIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
)

const PlayIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
)

const HeartIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
  </svg>
)

const RefreshCwIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
  </svg>
)

const Share2Icon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
  </svg>
)

const BookmarkIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
  </svg>
)

const Recommendations = ({ onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState("mood")
  const [selectedMood, setSelectedMood] = useState("")
  const [savedItems, setSavedItems] = useState([])
  const [aiSongs, setAiSongs] = useState([])
  const [aiQuotes, setAiQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [moodSelectionCount, setMoodSelectionCount] = useState({})
  const [categorySelectionCount, setCategorySelectionCount] = useState({})

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 border-yellow-300" },
    { emoji: "😢", label: "Sad", color: "bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 border-blue-300" },
    { emoji: "😡", label: "Angry", color: "bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 border-red-300" },
    { emoji: "😰", label: "Anxious", color: "bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 border-purple-300" },
    { emoji: "😴", label: "Tired", color: "bg-gradient-to-r from-gray-400 to-slate-400 hover:from-gray-500 hover:to-slate-500 border-gray-300" },
    { emoji: "🤗", label: "Excited", color: "bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 border-pink-300" },
    { emoji: "😌", label: "Calm", color: "bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 border-green-300" },
    { emoji: "🤔", label: "Confused", color: "bg-gradient-to-r from-indigo-400 to-blue-400 hover:from-indigo-500 hover:to-blue-500 border-indigo-300" },
    { emoji: "😎", label: "Confident", color: "bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 border-orange-300" }
  ]

  // Mock data based on mood
  const recommendations = {
    music: [
      {
        id: 1,
        title: "Happy",
        artist: "Pharrell Williams",
        mood: "Happy",
        description: "Upbeat and cheerful song to boost your mood",
        duration: "3:53",
        youtube_url: "https://www.youtube.com/watch?v=ZbZSe6N_BXs"
      },
      {
        id: 2,
        title: "Good as Hell",
        artist: "Lizzo",
        mood: "Happy",
        description: "Empowering track for confidence boost",
        duration: "3:37",
        youtube_url: "https://www.youtube.com/watch?v=CHM2G32qP6A"
      },
      {
        id: 3,
        title: "Weightless",
        artist: "Marconi Union",
        mood: "Anxious",
        description: "Scientifically proven to reduce anxiety by 65%",
        duration: "8:08",
        youtube_url: "https://www.youtube.com/watch?v=1ZYbU82GVz4"
      },
      {
        id: 4,
        title: "Someone Like You",
        artist: "Adele",
        mood: "Sad",
        description: "Emotional ballad for sad moments",
        duration: "4:45",
        youtube_url: "https://www.youtube.com/watch?v=hLQl3wQQFQ0"
      },
      {
        id: 5,
        title: "Killing in the Name",
        artist: "Rage Against the Machine",
        mood: "Angry",
        description: "Release anger with rock",
        duration: "5:14",
        youtube_url: "https://www.youtube.com/watch?v=bWXazVhlyxQ"
      },
      {
        id: 6,
        title: "River Flows in You",
        artist: "Yiruma",
        mood: "Calm",
        description: "Calming piano music",
        duration: "3:05",
        youtube_url: "https://www.youtube.com/watch?v=7maJOI3QMu0"
      },
      {
        id: 7,
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        mood: "Excited",
        description: "High energy funk",
        duration: "4:30",
        youtube_url: "https://www.youtube.com/watch?v=OPf0YbXqDm0"
      },
      {
        id: 8,
        title: "Sleepyhead",
        artist: "Passion Pit",
        mood: "Tired",
        description: "Dreamy vibes",
        duration: "3:30",
        youtube_url: "https://www.youtube.com/watch?v=AzP9h8f0t_k"
      }
    ]
  };

  const handleSaveItem = (item) => {
    if (!savedItems.includes(item.id)) {
      setSavedItems([...savedItems, item.id])
    }
  }

  const handleShare = (item) => {
    console.log("Sharing:", item)
  }

  const handleMoodSelection = async (mood) => {
    setSelectedMood(mood)
    setIsLoading(true)
    setCurrentCategory(null)
    
    // Track selection count for refresh functionality
    const newCount = (moodSelectionCount[mood] || 0) + 1
    setMoodSelectionCount(prev => ({ ...prev, [mood]: newCount }))
    
    try {
      // Fetch both songs and quotes
      const [recommendations, quotes] = await Promise.all([
        generateAISongRecommendations(mood, null, newCount - 1),
        generateAIQuotes(mood, newCount - 1)
      ])
      setAiSongs(recommendations)
      setAiQuotes(quotes)
      console.log(`AI-generated ${mood} songs (selection #${newCount}):`, recommendations)
      console.log(`AI-generated ${mood} quotes (selection #${newCount}):`, quotes)

      // Track mood selection to database
      try {
        await trackMoodSelection({
          mood_type: mood,
          emoji: moods.find(m => m.label === mood)?.emoji || '😊',
          energy_level: null, // Can be enhanced later
          stress_level: null, // Can be enhanced later
          note: `Selected ${mood} mood - got ${recommendations.length} songs and ${quotes.length} quotes`
        })
        console.log('Mood selection tracked to database')
      } catch (trackError) {
        console.warn('Failed to track mood selection:', trackError)
      }
    } catch (error) {
      console.error('Error getting AI recommendations:', error)
      setAiSongs([])
      setAiQuotes([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategorySelection = async (category) => {
    setSelectedMood("")
    setIsLoading(true)
    setCurrentCategory(category)
    
    // Track selection count for refresh functionality
    const newCount = (categorySelectionCount[category] || 0) + 1
    setCategorySelectionCount(prev => ({ ...prev, [category]: newCount }))
    
    try {
      // Fetch both songs and quotes (using category as mood for quotes)
      const [recommendations, quotes] = await Promise.all([
        generateAISongRecommendations(null, category, newCount - 1),
        generateAIQuotes(category, newCount - 1)
      ])
      setAiSongs(recommendations)
      setAiQuotes(quotes)
      console.log(`AI-generated ${category} songs (selection #${newCount}):`, recommendations)
      console.log(`AI-generated ${category} quotes (selection #${newCount}):`, quotes)

      // Track category selection to database
      try {
        await trackMoodSelection({
          mood_type: category,
          emoji: categoryData[category]?.icon || '🎵',
          energy_level: null,
          stress_level: null,
          note: `Selected ${category} category - got ${recommendations.length} songs and ${quotes.length} quotes`
        })
        console.log('Category selection tracked to database')
      } catch (trackError) {
        console.warn('Failed to track category selection:', trackError)
      }
    } catch (error) {
      console.error('Error getting AI recommendations:', error)
      setAiSongs([])
      setAiQuotes([])
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlaySong = async (song) => {
    try {
      // Open YouTube URL
      if (song.youtube_url && song.youtube_url !== "https://www.youtube.com/watch?v=U7Idt8P8u5o") {
        console.log('Opening YouTube URL:', song.youtube_url);
        window.open(song.youtube_url, '_blank', 'noopener,noreferrer');
      } else {
        const searchUrl = generateYouTubeSearchUrl(song.title, song.artist)
        console.log('Opening YouTube search:', searchUrl);
        window.open(searchUrl, '_blank', 'noopener,noreferrer');
      }

      // Track song play activity to database
      try {
        await trackSongActivity({
          song_title: song.title,
          artist: song.artist,
          category: selectedMood || currentCategory || 'Unknown',
          activity_type: 'play',
          note: `Played ${song.title} by ${song.artist}`
        })
        console.log('Song play activity tracked to database')
      } catch (trackError) {
        console.warn('Failed to track song activity:', trackError)
      }
    } catch (error) {
      console.error('Error playing song:', error)
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personalized Recommendations</h1>
          <p className="text-gray-600">How are you feeling today? Get personalized content based on your mood.</p>
        </div>

        {/* Mood Selector */}
        {!selectedMood && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How are you feeling?</h2>
            <p className="text-gray-600 mb-6">Select your mood to see personalized song recommendations, then click play to open on YouTube</p>
            <div className="grid grid-cols-3 gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => handleMoodSelection(mood.label)}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedMood === mood.label
                      ? `${mood.color} border-purple-500 scale-105`
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Selector */}
        {!selectedMood && !currentCategory && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Or choose a music category</h2>
            <p className="text-gray-600 mb-6">Get AI-curated playlists for different music categories</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => handleCategorySelection('Spiritual')}
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50 transition-all hover:scale-105"
              >
                <div className="text-4xl mb-2">🧘</div>
                <div className="text-sm font-medium">Spiritual</div>
              </button>
              <button
                onClick={() => handleCategorySelection('Travelling')}
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50 transition-all hover:scale-105"
              >
                <div className="text-4xl mb-2">✈️</div>
                <div className="text-sm font-medium">Travelling</div>
              </button>
              <button
                onClick={() => handleCategorySelection('Party')}
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50 transition-all hover:scale-105"
              >
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-sm font-medium">Party</div>
              </button>
              <button
                onClick={() => handleCategorySelection('Rock')}
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50 transition-all hover:scale-105"
              >
                <div className="text-4xl mb-2">🎸</div>
                <div className="text-sm font-medium">Rock</div>
              </button>
            </div>
          </div>
        )}

        {/* Selected Mood Display */}
        {selectedMood && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">
                  {moods.find(m => m.label === selectedMood)?.emoji}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Current Mood: {selectedMood}</h3>
                  <p className="text-gray-600">Here are your personalized recommendations</p>
                  <p className="text-xs text-purple-600 mt-1">Click mood again for different songs</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSelectedMood("")}
                className="border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600"
              >
                Change Mood
              </Button>
            </div>
          </div>
        )}

        {/* Selected Category Display */}
        {currentCategory && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">
                  {currentCategory === 'Spiritual' && '🧘'}
                  {currentCategory === 'Travelling' && '✈️'}
                  {currentCategory === 'Party' && '🎉'}
                  {currentCategory === 'Rock' && '🎸'}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Current Category: {currentCategory}</h3>
                  <p className="text-gray-600">Here are your AI-curated recommendations</p>
                  <p className="text-xs text-purple-600 mt-1">Click category again for different songs</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setCurrentCategory(null)}
                className="border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600"
              >
                Change Category
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-lg p-12 mb-8 border border-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI is curating your playlist...</h3>
              <p className="text-gray-600">Analyzing your {selectedMood ? 'mood' : 'category'} to find the perfect songs</p>
            </div>
          </div>
        )}

        {/* Recommendations Tabs */}
        {(selectedMood || currentCategory) && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("music")}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === "music"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  🎵 Music
                </button>
                <button
                  onClick={() => setActiveTab("quotes")}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === "quotes"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  💭 Quotes
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "music" && (
                <div className="space-y-4">
                  {aiSongs.map((song, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <MusicIcon />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{song.title}</h4>
                          <p className="text-sm text-gray-600">{song.artist}</p>
                          <p className="text-sm text-gray-500">{song.description}</p>
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
                        {song.youtube_url ? (
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
                        ) : (
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => handlePlaySong(song)}
                          >
                            <PlayIcon className="w-4 h-4 mr-1" />
                            Play
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {aiSongs.length === 0 && !isLoading && (
                    <div className="text-center py-8">
                      <MusicIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No songs found</h3>
                      <p className="text-gray-600">Try selecting a different mood or category</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "quotes" && (
                <div className="space-y-4">
                  {aiQuotes.length > 0 ? (
                    aiQuotes.map((quote, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-gray-900 italic">"{quote.text}"</p>
                            <p className="text-sm text-gray-600 mt-2">— {quote.author}</p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSaveItem(quote)}
                              className={savedItems.includes(quote.text) ? "text-purple-600" : "text-gray-400"}
                            >
                              <BookmarkIcon />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleShare(quote)}>
                              <Share2Icon />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💭</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
                      <p className="text-gray-600">Try selecting a different mood or category</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedMood && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select your mood</h3>
            <p className="text-gray-600">Choose how you're feeling above to get personalized recommendations</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recommendations
