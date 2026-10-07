const { pool } = require('../config/database')

class Recommendation {
  // Get music recommendations by mood
  static async getMusicByMood(moodType) {
    const [recommendations] = await pool.execute(
      `SELECT * FROM music_recommendations 
       WHERE mood_type = ? 
       ORDER BY RAND() 
       LIMIT 10`,
      [moodType]
    )
    
    return recommendations
  }
  
  // Get activity recommendations by mood
  static async getActivitiesByMood(moodType) {
    const [recommendations] = await pool.execute(
      `SELECT * FROM activity_recommendations 
       WHERE mood_type = ? 
       ORDER BY RAND() 
       LIMIT 10`,
      [moodType]
    )
    
    return recommendations
  }
  
  // Get quote recommendations by mood
  static async getQuotesByMood(moodType) {
    const [recommendations] = await pool.execute(
      `SELECT * FROM quote_recommendations 
       WHERE mood_type = ? 
       ORDER BY RAND() 
       LIMIT 10`,
      [moodType]
    )
    
    return recommendations
  }
  
  // Get all recommendations by mood (combined)
  static async getAllByMood(moodType) {
    try {
      const [music] = await pool.execute(
        'SELECT * FROM music_recommendations WHERE mood_type = ? ORDER BY RAND() LIMIT 5',
        [moodType]
      )
      
      const [activities] = await pool.execute(
        'SELECT * FROM activity_recommendations WHERE mood_type = ? ORDER BY RAND() LIMIT 5',
        [moodType]
      )
      
      const [quotes] = await pool.execute(
        'SELECT * FROM quote_recommendations WHERE mood_type = ? ORDER BY RAND() LIMIT 5',
        [moodType]
      )
      
      return {
        music,
        activities,
        quotes
      }
    } catch (error) {
      throw error
    }
  }
  
  // Add new music recommendation
  static async addMusic(musicData) {
    const { mood_type, title, artist, duration, description } = musicData
    
    const [result] = await pool.execute(
      'INSERT INTO music_recommendations (mood_type, title, artist, duration, description) VALUES (?, ?, ?, ?, ?)',
      [mood_type, title, artist, duration, description]
    )
    
    return { id: result.insertId, ...musicData }
  }
  
  // Add new activity recommendation
  static async addActivity(activityData) {
    const { mood_type, title, description, duration } = activityData
    
    const [result] = await pool.execute(
      'INSERT INTO activity_recommendations (mood_type, title, description, duration) VALUES (?, ?, ?, ?)',
      [mood_type, title, description, duration]
    )
    
    return { id: result.insertId, ...activityData }
  }
  
  // Add new quote recommendation
  static async addQuote(quoteData) {
    const { mood_type, quote, author } = quoteData
    
    const [result] = await pool.execute(
      'INSERT INTO quote_recommendations (mood_type, quote, author) VALUES (?, ?, ?)',
      [mood_type, quote, author]
    )
    
    return { id: result.insertId, ...quoteData }
  }
  
  // Get all available mood types
  static async getMoodTypes() {
    const [musicMoods] = await pool.execute(
      'SELECT DISTINCT mood_type FROM music_recommendations ORDER BY mood_type'
    )
    
    return musicMoods.map(item => item.mood_type)
  }
  
  // Get recommendations count by mood
  static async getCountsByMood() {
    const [musicCounts] = await pool.execute(
      `SELECT mood_type, COUNT(*) as count 
       FROM music_recommendations 
       GROUP BY mood_type 
       ORDER BY count DESC`
    )
    
    const [activityCounts] = await pool.execute(
      `SELECT mood_type, COUNT(*) as count 
       FROM activity_recommendations 
       GROUP BY mood_type 
       ORDER BY count DESC`
    )
    
    const [quoteCounts] = await pool.execute(
      `SELECT mood_type, COUNT(*) as count 
       FROM quote_recommendations 
       GROUP BY mood_type 
       ORDER BY count DESC`
    )
    
    return {
      music: musicCounts,
      activities: activityCounts,
      quotes: quoteCounts
    }
  }
  
  // Search recommendations
  static async search(moodType, query, type = 'all') {
    let searchQuery = ''
    let params = []
    
    if (type === 'music') {
      searchQuery = `
        SELECT * FROM music_recommendations 
        WHERE mood_type = ? 
        AND (title LIKE ? OR artist LIKE ? OR description LIKE ?)
      `
      params = [moodType, `%${query}%`, `%${query}%`, `%${query}%`]
    } else if (type === 'activities') {
      searchQuery = `
        SELECT * FROM activity_recommendations 
        WHERE mood_type = ? 
        AND (title LIKE ? OR description LIKE ?)
      `
      params = [moodType, `%${query}%`, `%${query}%`]
    } else if (type === 'quotes') {
      searchQuery = `
        SELECT * FROM quote_recommendations 
        WHERE mood_type = ? 
        AND (quote LIKE ? OR author LIKE ?)
      `
      params = [moodType, `%${query}%`, `%${query}%`]
    }
    
    const [results] = await pool.execute(searchQuery, params)
    return results
  }
}

module.exports = Recommendation
