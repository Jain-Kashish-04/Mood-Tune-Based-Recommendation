const { pool } = require('../config/database')

class MoodEntry {
  // Create new mood entry
  static async create(entryData) {
    const { 
      user_id, 
      mood_type, 
      emoji, 
      energy_level, 
      stress_level, 
      note 
    } = entryData
    
    try {
      const [result] = await pool.execute(
        `INSERT INTO mood_entries 
         (user_id, mood_type, emoji, energy_level, stress_level, note) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, mood_type, emoji, energy_level, stress_level, note]
      )
      
      // Get created entry
      const [entries] = await pool.execute(
        `SELECT * FROM mood_entries WHERE id = ?`,
        [result.insertId]
      )
      
      return entries[0]
    } catch (error) {
      throw error
    }
  }
  
  // Get all mood entries for a user
  static async findByUserId(userId, limit = 50, offset = 0) {
    const [entries] = await pool.execute(
      `SELECT * FROM mood_entries 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    )
    
    return entries
  }
  
  // Get mood entries by date range
  static async findByDateRange(userId, startDate, endDate) {
    const [entries] = await pool.execute(
      `SELECT * FROM mood_entries 
       WHERE user_id = ? 
       AND created_at BETWEEN ? AND ?
       ORDER BY created_at DESC`,
      [userId, startDate, endDate]
    )
    
    return entries
  }
  
  // Get mood entries for today
  static async getTodayEntries(userId) {
    const [entries] = await pool.execute(
      `SELECT * FROM mood_entries 
       WHERE user_id = ? 
       AND DATE(created_at) = CURDATE()
       ORDER BY created_at DESC`,
      [userId]
    )
    
    return entries
  }
  
  // Get mood analytics for user
  static async getAnalytics(userId, days = 30) {
    const [entries] = await pool.execute(
      `SELECT * FROM mood_entries 
       WHERE user_id = ? 
       AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       ORDER BY created_at DESC`,
      [userId, days]
    )
    
    // Calculate analytics
    const totalEntries = entries.length
    const moodDistribution = {}
    const avgEnergyLevel = entries.reduce((sum, entry) => sum + (entry.energy_level || 0), 0) / totalEntries || 0
    const avgStressLevel = entries.reduce((sum, entry) => sum + (entry.stress_level || 0), 0) / totalEntries || 0
    
    // Count mood types
    entries.forEach(entry => {
      moodDistribution[entry.mood_type] = (moodDistribution[entry.mood_type] || 0) + 1
    })
    
    // Get recent trend (last 7 days)
    const recentTrend = entries.slice(0, 7)
    
    // Calculate current streak
    const currentStreak = await this.calculateStreak(userId)
    
    return {
      totalEntries,
      moodDistribution,
      avgEnergyLevel: Math.round(avgEnergyLevel * 10) / 10,
      avgStressLevel: Math.round(avgStressLevel * 10) / 10,
      recentTrend,
      currentStreak
    }
  }
  
  // Calculate current streak
  static async calculateStreak(userId) {
    const [entries] = await pool.execute(
      `SELECT DISTINCT DATE(created_at) as entry_date 
       FROM mood_entries 
       WHERE user_id = ? 
       ORDER BY entry_date DESC`,
      [userId]
    )
    
    if (entries.length === 0) return 0
    
    let streak = 1
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    for (let i = 0; i < entries.length; i++) {
      const entryDate = new Date(entries[i].entry_date)
      entryDate.setHours(0, 0, 0, 0)
      
      const expectedDate = new Date(today)
      expectedDate.setDate(today.getDate() - i)
      
      if (entryDate.getTime() === expectedDate.getTime()) {
        streak++
      } else {
        break
      }
    }
    
    return streak - 1
  }
  
  // Update mood entry
  static async update(id, entryData, userId) {
    const { mood_type, emoji, energy_level, stress_level, note } = entryData
    
    const [result] = await pool.execute(
      `UPDATE mood_entries 
       SET mood_type = ?, emoji = ?, energy_level = ?, stress_level = ?, note = ?
       WHERE id = ? AND user_id = ?`,
      [mood_type, emoji, energy_level, stress_level, note, id, userId]
    )
    
    if (result.affectedRows === 0) {
      throw new Error('Entry not found or unauthorized')
    }
    
    return await this.findById(id)
  }
  
  // Delete mood entry
  static async delete(id, userId) {
    const [result] = await pool.execute(
      'DELETE FROM mood_entries WHERE id = ? AND user_id = ?',
      [id, userId]
    )
    
    return result.affectedRows > 0
  }
  
  // Get single mood entry by ID
  static async findById(id) {
    const [entries] = await pool.execute(
      'SELECT * FROM mood_entries WHERE id = ?',
      [id]
    )
    
    return entries[0] || null
  }
}

module.exports = MoodEntry
