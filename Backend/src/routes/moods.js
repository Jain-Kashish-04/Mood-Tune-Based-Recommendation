const express = require('express')
const { body, validationResult } = require('express-validator')
const MoodEntry = require('../models/MoodEntry')
const { authenticateToken } = require('../middleware/auth')
const router = express.Router()

// Create new mood entry
router.post('/', authenticateToken, [
  body('mood_type').notEmpty().withMessage('Mood type is required'),
  body('emoji').notEmpty().withMessage('Emoji is required'),
  body('energy_level').optional().isInt({ min: 1, max: 10 }).withMessage('Energy level must be between 1 and 10'),
  body('stress_level').optional().isInt({ min: 1, max: 10 }).withMessage('Stress level must be between 1 and 10'),
  body('note').optional().isLength({ max: 1000 }).withMessage('Note must be less than 1000 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { mood_type, emoji, energy_level, stress_level, note } = req.body
    const user_id = req.user.id

    const newEntry = await MoodEntry.create({
      user_id,
      mood_type,
      emoji,
      energy_level,
      stress_level,
      note
    })

    res.status(201).json({
      success: true,
      message: 'Mood entry created successfully',
      entry: newEntry
    })
  } catch (error) {
    console.error('Mood entry creation error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create mood entry',
      message: error.message
    })
  }
})

// Get all mood entries for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    const limit = parseInt(req.query.limit) || 50
    const offset = parseInt(req.query.offset) || 0

    const entries = await MoodEntry.findByUserId(user_id, limit, offset)

    res.json({
      success: true,
      entries,
      count: entries.length
    })
  } catch (error) {
    console.error('Get mood entries error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get mood entries',
      message: error.message
    })
  }
})

// Get mood entries by date range
router.get('/date-range', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    const { start_date, end_date } = req.query

    if (!start_date || !end_date) {
      return res.status(400).json({
        success: false,
        error: 'Start date and end date are required'
      })
    }

    const entries = await MoodEntry.findByDateRange(user_id, start_date, end_date)

    res.json({
      success: true,
      entries,
      count: entries.length
    })
  } catch (error) {
    console.error('Get mood entries by date range error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get mood entries',
      message: error.message
    })
  }
})

// Get today's mood entries
router.get('/today', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    const entries = await MoodEntry.getTodayEntries(user_id)

    res.json({
      success: true,
      entries,
      count: entries.length
    })
  } catch (error) {
    console.error('Get today\'s mood entries error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get today\'s mood entries',
      message: error.message
    })
  }
})

// Get mood analytics
router.get('/analytics', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    const days = parseInt(req.query.days) || 30

    const analytics = await MoodEntry.getAnalytics(user_id, days)

    res.json({
      success: true,
      analytics
    })
  } catch (error) {
    console.error('Get mood analytics error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get mood analytics',
      message: error.message
    })
  }
})

// Get single mood entry
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const user_id = req.user.id

    const entry = await MoodEntry.findById(id)

    if (!entry) {
      return res.status(404).json({
        success: false,
        error: 'Mood entry not found'
      })
    }

    if (entry.user_id !== user_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      })
    }

    res.json({
      success: true,
      entry
    })
  } catch (error) {
    console.error('Get mood entry error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get mood entry',
      message: error.message
    })
  }
})

// Update mood entry
router.put('/:id', authenticateToken, [
  body('mood_type').optional().notEmpty().withMessage('Mood type cannot be empty'),
  body('emoji').optional().notEmpty().withMessage('Emoji cannot be empty'),
  body('energy_level').optional().isInt({ min: 1, max: 10 }).withMessage('Energy level must be between 1 and 10'),
  body('stress_level').optional().isInt({ min: 1, max: 10 }).withMessage('Stress level must be between 1 and 10'),
  body('note').optional().isLength({ max: 1000 }).withMessage('Note must be less than 1000 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { id } = req.params
    const user_id = req.user.id
    const updateData = req.body

    const updatedEntry = await MoodEntry.update(id, updateData, user_id)

    res.json({
      success: true,
      message: 'Mood entry updated successfully',
      entry: updatedEntry
    })
  } catch (error) {
    console.error('Update mood entry error:', error)
    
    if (error.message === 'Entry not found or unauthorized') {
      return res.status(404).json({
        success: false,
        error: 'Mood entry not found or access denied'
      })
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update mood entry',
      message: error.message
    })
  }
})

// Delete mood entry
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const user_id = req.user.id

    const deleted = await MoodEntry.delete(id, user_id)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Mood entry not found or access denied'
      })
    }

    res.json({
      success: true,
      message: 'Mood entry deleted successfully'
    })
  } catch (error) {
    console.error('Delete mood entry error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete mood entry',
      message: error.message
    })
  }
})

module.exports = router
