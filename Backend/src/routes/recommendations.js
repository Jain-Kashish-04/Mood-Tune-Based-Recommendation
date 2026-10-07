const express = require('express')
const { body, validationResult } = require('express-validator')
const Recommendation = require('../models/Recommendation')
const { authenticateToken, optionalAuth } = require('../middleware/auth')
const router = express.Router()

// Get all recommendations by mood type
router.get('/:moodType', optionalAuth, async (req, res) => {
  try {
    const { moodType } = req.params
    const { type } = req.query // Can be 'music', 'activities', 'quotes', or 'all'

    // Validate mood type
    const validMoods = ['Happy', 'Sad', 'Angry', 'Anxious', 'Tired', 'Excited', 'Calm', 'Confused', 'Confident']
    if (!validMoods.includes(moodType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid mood type',
        validMoods
      })
    }

    let recommendations

    switch (type) {
      case 'music':
        recommendations = await Recommendation.getMusicByMood(moodType)
        break
      case 'activities':
        recommendations = await Recommendation.getActivitiesByMood(moodType)
        break
      case 'quotes':
        recommendations = await Recommendation.getQuotesByMood(moodType)
        break
      case 'all':
      default:
        recommendations = await Recommendation.getAllByMood(moodType)
        break
    }

    res.json({
      success: true,
      moodType,
      type: type || 'all',
      recommendations
    })
  } catch (error) {
    console.error('Get recommendations error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get recommendations',
      message: error.message
    })
  }
})

// Get music recommendations by mood
router.get('/:moodType/music', optionalAuth, async (req, res) => {
  try {
    const { moodType } = req.params
    const recommendations = await Recommendation.getMusicByMood(moodType)

    res.json({
      success: true,
      moodType,
      type: 'music',
      recommendations
    })
  } catch (error) {
    console.error('Get music recommendations error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get music recommendations',
      message: error.message
    })
  }
})

// Get activity recommendations by mood
router.get('/:moodType/activities', optionalAuth, async (req, res) => {
  try {
    const { moodType } = req.params
    const recommendations = await Recommendation.getActivitiesByMood(moodType)

    res.json({
      success: true,
      moodType,
      type: 'activities',
      recommendations
    })
  } catch (error) {
    console.error('Get activity recommendations error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get activity recommendations',
      message: error.message
    })
  }
})

// Get quote recommendations by mood
router.get('/:moodType/quotes', optionalAuth, async (req, res) => {
  try {
    const { moodType } = req.params
    const recommendations = await Recommendation.getQuotesByMood(moodType)

    res.json({
      success: true,
      moodType,
      type: 'quotes',
      recommendations
    })
  } catch (error) {
    console.error('Get quote recommendations error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get quote recommendations',
      message: error.message
    })
  }
})

// Get all available mood types
router.get('/moods/types', async (req, res) => {
  try {
    const moodTypes = await Recommendation.getMoodTypes()

    res.json({
      success: true,
      moodTypes
    })
  } catch (error) {
    console.error('Get mood types error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get mood types',
      message: error.message
    })
  }
})

// Get recommendation counts by mood
router.get('/moods/counts', async (req, res) => {
  try {
    const counts = await Recommendation.getCountsByMood()

    res.json({
      success: true,
      counts
    })
  } catch (error) {
    console.error('Get recommendation counts error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get recommendation counts',
      message: error.message
    })
  }
})

// Search recommendations
router.get('/:moodType/search', optionalAuth, async (req, res) => {
  try {
    const { moodType } = req.params
    const { q: query, type } = req.query

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      })
    }

    const recommendations = await Recommendation.search(moodType, query, type)

    res.json({
      success: true,
      moodType,
      query,
      type: type || 'all',
      recommendations
    })
  } catch (error) {
    console.error('Search recommendations error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to search recommendations',
      message: error.message
    })
  }
})

// Add new music recommendation (admin only)
router.post('/music/add', authenticateToken, [
  body('mood_type').notEmpty().withMessage('Mood type is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('artist').notEmpty().withMessage('Artist is required'),
  body('duration').optional().notEmpty().withMessage('Duration cannot be empty'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description must be less than 500 characters')
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

    const musicData = req.body
    const newMusic = await Recommendation.addMusic(musicData)

    res.status(201).json({
      success: true,
      message: 'Music recommendation added successfully',
      music: newMusic
    })
  } catch (error) {
    console.error('Add music recommendation error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to add music recommendation',
      message: error.message
    })
  }
})

// Add new activity recommendation (admin only)
router.post('/activities/add', authenticateToken, [
  body('mood_type').notEmpty().withMessage('Mood type is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('duration').optional().notEmpty().withMessage('Duration cannot be empty')
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

    const activityData = req.body
    const newActivity = await Recommendation.addActivity(activityData)

    res.status(201).json({
      success: true,
      message: 'Activity recommendation added successfully',
      activity: newActivity
    })
  } catch (error) {
    console.error('Add activity recommendation error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to add activity recommendation',
      message: error.message
    })
  }
})

// Add new quote recommendation (admin only)
router.post('/quotes/add', authenticateToken, [
  body('mood_type').notEmpty().withMessage('Mood type is required'),
  body('quote').notEmpty().withMessage('Quote is required'),
  body('author').optional().notEmpty().withMessage('Author cannot be empty')
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

    const quoteData = req.body
    const newQuote = await Recommendation.addQuote(quoteData)

    res.status(201).json({
      success: true,
      message: 'Quote recommendation added successfully',
      quote: newQuote
    })
  } catch (error) {
    console.error('Add quote recommendation error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to add quote recommendation',
      message: error.message
    })
  }
})

module.exports = router
