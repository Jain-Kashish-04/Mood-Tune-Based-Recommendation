const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

// Import database configuration
const { pool, testConnection, initializeDatabase, seedRecommendations } = require('./config/database')

// Import routes
const authRoutes = require('./routes/auth')
const moodRoutes = require('./routes/moods')
const recommendationRoutes = require('./routes/recommendations')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
})
app.use('/api/', limiter)

// Routes
// Welcome page for browser
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MoodTune Backend API</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }
            .container {
                text-align: center;
                padding: 2rem;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                max-width: 800px;
                margin: 0 20px;
            }
            .emoji {
                font-size: 4rem;
                margin-bottom: 1rem;
                animation: bounce 2s infinite;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-20px);
                }
                60% {
                    transform: translateY(-10px);
                }
            }
            h1 {
                font-size: 3rem;
                margin-bottom: 1rem;
                background: linear-gradient(45deg, #fff, #f0f0f0);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .subtitle {
                font-size: 1.5rem;
                margin-bottom: 2rem;
                opacity: 0.9;
            }
            .status {
                background: rgba(76, 175, 80, 0.2);
                border: 2px solid #4CAF50;
                border-radius: 10px;
                padding: 1rem;
                margin: 2rem 0;
                font-size: 1.2rem;
            }
            .api-info {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 1.5rem;
                margin: 2rem 0;
                text-align: left;
            }
            .api-info h3 {
                margin-bottom: 1rem;
                color: #fff;
                font-size: 1.5rem;
            }
            .endpoint {
                background: rgba(255, 255, 255, 0.1);
                padding: 0.8rem;
                margin: 0.5rem 0;
                border-radius: 5px;
                font-family: 'Courier New', monospace;
                border-left: 4px solid #4CAF50;
            }
            .method {
                display: inline-block;
                padding: 0.2rem 0.5rem;
                border-radius: 3px;
                font-weight: bold;
                margin-right: 0.5rem;
            }
            .get { background: #2196F3; }
            .post { background: #4CAF50; }
            .put { background: #FF9800; }
            .delete { background: #f44336; }
            .features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin: 2rem 0;
            }
            .feature {
                background: rgba(255, 255, 255, 0.1);
                padding: 1rem;
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .feature-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            .footer {
                margin-top: 2rem;
                opacity: 0.8;
                font-size: 0.9rem;
            }
            .pulse {
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="emoji">🎵😊🎉</div>
            <h1>MoodTune Backend API</h1>
            <p class="subtitle">Your Mood-Based Music & Activity Recommender is Running!</p>
            
            <div class="status pulse">
                ✅ <strong>Server Status:</strong> ONLINE & CONNECTED
                <br>🗄️ <strong>Database:</strong> MySQL Connected
                <br>🔐 <strong>Authentication:</strong> JWT Ready
            </div>

            <div class="features">
                <div class="feature">
                    <div class="feature-icon">👤</div>
                    <h3>User Auth</h3>
                    <p>Register & Login</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">📊</div>
                    <h3>Mood Tracking</h3>
                    <p>Log & Analyze Moods</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">🎵</div>
                    <h3>Music</h3>
                    <p>Mood-Based Songs</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">🏃</div>
                    <h3>Activities</h3>
                    <p>Personalized Activities</p>
                </div>
            </div>

            <div class="api-info">
                <h3>🔗 Available API Endpoints:</h3>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <strong>/api/health</strong> - Health Check
                </div>
                
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <strong>/api/auth/register</strong> - User Registration
                </div>
                
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <strong>/api/auth/login</strong> - User Login
                </div>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <strong>/api/recommendations/:mood</strong> - Get Recommendations
                </div>
                
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <strong>/api/moods</strong> - Log Mood Entry
                </div>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <strong>/api/moods/analytics</strong> - Mood Analytics
                </div>
            </div>

            <div class="footer">
                <p>🚀 Server running on port ${PORT}</p>
                <p>📅 Started at ${new Date().toLocaleString()}</p>
                <p>💚 Made with love for MoodTune</p>
            </div>
        </div>

        <script>
            // Add some interactivity
            document.addEventListener('DOMContentLoaded', function() {
                const features = document.querySelectorAll('.feature');
                features.forEach((feature, index) => {
                    feature.style.animationDelay = \`\${index * 0.1}s\`;
                    feature.style.animation = 'fadeInUp 0.6s ease-out forwards';
                });
            });

            // Add fadeInUp animation
            const style = document.createElement('style');
            style.textContent = \`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            \`;
            document.head.appendChild(style);
        </script>
    </body>
    </html>
  `)
})

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MoodTune API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/moods', moodRoutes)
app.use('/api/recommendations', recommendationRoutes)
app.use('/api/user-activity', require('./routes/userActivity'))

// Mock data (keeping for backward compatibility)
const mockUsers = [
  { id: '1', email: 'john@example.com', name: 'John Doe' }
]

const mockMoodEntries = [
  {
    id: '1',
    userId: '1',
    mood: 'Happy',
    emoji: '😊',
    note: 'Had a great morning workout!',
    date: '2024-03-14',
    time: '10:30 AM'
  }
]

const mockRecommendations = {
  Happy: {
    music: ['Happy by Pharrell Williams', 'Good as Hell by Lizzo'],
    activities: ['Morning walk', 'Call a friend'],
    quotes: ['The only way to do great work is to love what you do.']
  },
  Sad: {
    music: ['Someone Like You by Adele', 'Fix You by Coldplay'],
    activities: ['Watch a comfort movie', 'Talk to a friend'],
    quotes: ['Every moment is a fresh beginning.']
  }
}

// Legacy routes (keeping for compatibility)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body
  
  // Mock registration
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    createdAt: new Date().toISOString()
  }
  
  res.json({ success: true, user: newUser, token: 'mock_token_' + Date.now() })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  
  // Mock login
  const user = mockUsers.find(u => u.email === email)
  if (user) {
    res.json({ success: true, user, token: 'mock_token_' + Date.now() })
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' })
  }
})

app.post('/api/mood', (req, res) => {
  const { userId, mood, emoji, note } = req.body
  
  const newEntry = {
    id: Date.now().toString(),
    userId,
    mood,
    emoji,
    note,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }
  
  mockMoodEntries.push(newEntry)
  res.json({ success: true, entry: newEntry })
})

app.get('/api/mood/:userId', (req, res) => {
  const { userId } = req.params
  const userEntries = mockMoodEntries.filter(entry => entry.userId === userId)
  res.json({ success: true, entries: userEntries })
})

app.get('/api/recommendations/:mood', (req, res) => {
  const { mood } = req.params
  const recommendations = mockRecommendations[mood] || mockRecommendations['Happy']
  res.json({ success: true, recommendations })
})

app.get('/api/analytics/:userId', (req, res) => {
  const { userId } = req.params
  const userEntries = mockMoodEntries.filter(entry => entry.userId === userId)
  
  const analytics = {
    totalEntries: userEntries.length,
    moodDistribution: {
      Happy: userEntries.filter(e => e.mood === 'Happy').length,
      Sad: userEntries.filter(e => e.mood === 'Sad').length
    },
    recentTrend: userEntries.slice(-7)
  }
  
  res.json({ success: true, analytics })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    path: req.originalUrl
  })
})

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection()
    
    // Initialize database tables
    await initializeDatabase()
    
    // Seed sample data
    await seedRecommendations()
    
    // Start server
    app.listen(PORT, () => {
      console.log('\n🎉================================🎉')
      console.log('🚀 MOODTUNE BACKEND API SUCCESSFULLY STARTED!')
      console.log('🎉================================🎉')
      console.log(`📊 Server running on: http://localhost:${PORT}`)
      console.log(`� Health check: http://localhost:${PORT}/api/health`)
      console.log(`🗄️  Database: MySQL connected successfully`)
      console.log(`💾 Database Name: moodtune`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
      console.log(`🔐 JWT Authentication: Enabled`)
      console.log(`🛡️  Rate Limiting: Active`)
      console.log('🎉================================🎉')
      console.log('✅ Your backend is ready for frontend connection!')
      console.log('🎉================================🎉\n')
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Shutting down gracefully...')
  
  try {
    await pool.end()
    console.log('✅ Database connection closed')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error during shutdown:', error.message)
    process.exit(1)
  }
})

process.on('SIGTERM', async () => {
  console.log('\n🔄 SIGTERM received, shutting down gracefully...')
  
  try {
    await pool.end()
    console.log('✅ Database connection closed')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error during shutdown:', error.message)
    process.exit(1)
  }
})

// Start the server
startServer()

module.exports = app
