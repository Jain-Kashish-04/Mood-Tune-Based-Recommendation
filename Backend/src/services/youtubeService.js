const axios = require('axios')

class YouTubeService {
  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || ''
    this.baseUrl = 'https://www.googleapis.com/youtube/v3'
  }

  // Search for a song on YouTube
  async searchSong(songTitle, artist) {
    try {
      const searchQuery = `${songTitle} ${artist} official video`
      
      if (!this.apiKey) {
        // Fallback: Return YouTube search URL without API
        return {
          videoId: null,
          watchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
          title: songTitle,
          artist: artist
        }
      }

      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          part: 'snippet',
          q: searchQuery,
          type: 'video',
          maxResults: 1,
          key: this.apiKey
        }
      })

      const video = response.data.items[0]
      if (video) {
        return {
          videoId: video.id.videoId,
          watchUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.medium.url,
          artist: artist
        }
      }

      return null
    } catch (error) {
      console.error('YouTube search error:', error)
      // Fallback to search URL
      return {
        videoId: null,
        watchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${songTitle} ${artist}`)}`,
        title: songTitle,
        artist: artist
      }
    }
  }

  // Get video embed URL for iframe
  getEmbedUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`
  }
}

module.exports = new YouTubeService()
