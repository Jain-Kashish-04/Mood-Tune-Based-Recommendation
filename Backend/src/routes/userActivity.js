const express = require('express')
const { body, validationResult } = require('express-validator')
const { pool } = require('../config/database')
const { authenticateToken } = require('../middleware/auth')
const router = express.Router()

// Middleware to get user ID from JWT token
const getUserId = (req) => {
  return req.user.id
}

// Track mood selection
router.post('/mood', authenticateToken, [
  body('mood').notEmpty().withMessage('Mood is required'),
  body('notes').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { mood, notes } = req.body
    const userId = getUserId(req)

    // Insert mood selection for specific user
    const [result] = await pool.execute(
      'INSERT INTO user_activity (user_id, activity_type, activity_data) VALUES (?, ?, ?)',
      [userId, 'mood_selection', JSON.stringify({ mood, notes })]
    )

    res.status(201).json({
      success: true,
      message: 'Mood selection tracked',
      activity_id: result.insertId
    })
  } catch (error) {
    console.error('Mood tracking error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to track mood selection'
    })
  }
})

// Track song activity
router.post('/song', authenticateToken, [
  body('song_title').notEmpty().withMessage('Song title is required'),
  body('artist').notEmpty().withMessage('Artist is required'),
  body('youtube_url').optional().isURL()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const songData = req.body
    const userId = getUserId(req)

    // Insert song activity for specific user
    const [result] = await pool.execute(
      'INSERT INTO user_activity (user_id, activity_type, activity_data) VALUES (?, ?, ?)',
      [userId, 'song_play', JSON.stringify(songData)]
    )

    res.status(201).json({
      success: true,
      message: 'Song activity tracked',
      activity_id: result.insertId
    })
  } catch (error) {
    console.error('Song tracking error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to track song activity'
    })
  }
})

// Get user's activity history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = getUserId(req)
    const { limit = 50, offset = 0 } = req.query

    // Get user's activities only
    const [activities] = await pool.execute(
      `SELECT * FROM user_activity 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [userId, parseInt(limit), parseInt(offset)]
    )

    // Parse JSON data for each activity
    const parsedActivities = activities.map(activity => ({
      ...activity,
      activity_data: JSON.parse(activity.activity_data)
    }))

    res.json({
      success: true,
      activities: parsedActivities,
      total: parsedActivities.length
    })
  } catch (error) {
    console.error('History fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch activity history'
    })
  }
})

// Get user's analytics
router.get('/analytics', authenticateToken, async (req, res) => {
  try {
    const userId = getUserId(req)

    // Get user's mood statistics
    const [moodStats] = await pool.execute(
      `SELECT 
        activity_type,
        JSON_EXTRACT(activity_data, '$.mood') as mood,
        COUNT(*) as count,
        DATE(created_at) as date
       FROM user_activity 
       WHERE user_id = ? AND activity_type = 'mood_selection'
       GROUP BY mood, DATE(created_at)
       ORDER BY date DESC`,
      [userId]
    )

    // Get user's total statistics
    const [totalStats] = await pool.execute(
      `SELECT 
        COUNT(*) as total_entries,
        COUNT(DISTINCT DATE(created_at)) as active_days,
        MAX(created_at) as last_activity
       FROM user_activity 
       WHERE user_id = ?`,
      [userId]
    )

    // Get user's song statistics
    const [songStats] = await pool.execute(
      `SELECT 
        COUNT(*) as total_songs,
        COUNT(DISTINCT JSON_EXTRACT(activity_data, '$.song_title')) as unique_songs
       FROM user_activity 
       WHERE user_id = ? AND activity_type = 'song_play'`,
      [userId]
    )

    // Calculate streak (consecutive days with activity)
    const [streakData] = await pool.execute(
      `SELECT 
        COUNT(DISTINCT DATE(created_at)) as streak_days
       FROM user_activity 
       WHERE user_id = ? 
       AND created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY DATE(created_at) DESC`,
      [userId]
    )

    const analytics = {
      total_entries: totalStats[0]?.total_entries || 0,
      active_days: totalStats[0]?.active_days || 0,
      total_songs: songStats[0]?.total_songs || 0,
      unique_songs: songStats[0]?.unique_songs || 0,
      current_streak: streakData.length || 0,
      last_activity: totalStats[0]?.last_activity || null,
      mood_breakdown: moodStats,
      this_week_entries: moodStats.filter(m => {
        const activityDate = new Date(m.date)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return activityDate >= weekAgo
      }).length
    }

    res.json({
      success: true,
      analytics
    })
  } catch (error) {
    console.error('Analytics fetch error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics'
    })
  }
})

// Export user data
router.get('/export', authenticateToken, async (req, res) => {
  try {
    const userId = getUserId(req)

    // Get all user activities
    const [activities] = await pool.execute(
      `SELECT * FROM user_activity 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [userId]
    )

    // Parse and format data for export
    const exportData = activities.map(activity => ({
      date: activity.created_at,
      type: activity.activity_type,
      data: JSON.parse(activity.activity_data)
    }))

    res.json({
      success: true,
      export_data: exportData,
      total_entries: exportData.length
    })
  } catch (error) {
    console.error('Export error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to export data'
    })
  }
})

// Delete user activity
router.delete('/activity/:id', authenticateToken, async (req, res) => {
  try {
    const userId = getUserId(req)
    const activityId = req.params.id

    // Delete only user's own activity
    const [result] = await pool.execute(
      'DELETE FROM user_activity WHERE id = ? AND user_id = ?',
      [activityId, userId]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Activity not found or access denied'
      })
    }

    res.json({
      success: true,
      message: 'Activity deleted successfully'
    })
  } catch (error) {
    console.error('Delete activity error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete activity'
    })
  }
})

module.exports = router
