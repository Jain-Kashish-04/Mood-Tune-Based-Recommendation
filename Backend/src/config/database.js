const mysql = require('mysql2/promise')
require('dotenv').config()

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_NAME || 'moodtune',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

// Create connection pool
const pool = mysql.createPool(dbConfig)

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection()
    console.log('✅ MySQL database connected successfully')
    connection.release()
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message)
    process.exit(1)
  }
}

// Initialize database tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection()
    
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    
    // Create mood_entries table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mood_entries (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        mood_type VARCHAR(50) NOT NULL,
        emoji VARCHAR(10) NOT NULL,
        energy_level INT(1),
        stress_level INT(1),
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `)
    
    // Create music_recommendations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS music_recommendations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        mood_type VARCHAR(50) NOT NULL,
        title VARCHAR(200) NOT NULL,
        artist VARCHAR(100) NOT NULL,
        duration VARCHAR(10),
        description TEXT,
        youtube_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    // Create activity_recommendations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS activity_recommendations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        mood_type VARCHAR(50) NOT NULL,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        duration VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    // Create quote_recommendations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS quote_recommendations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        mood_type VARCHAR(50) NOT NULL,
        quote TEXT NOT NULL,
        author VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    console.log('✅ Database tables initialized successfully')
    connection.release()
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message)
  }
}

// Insert sample recommendations if tables are empty
const seedRecommendations = async () => {
  try {
    const connection = await pool.getConnection()
    
    // Check if music recommendations exist
    const [musicRows] = await connection.execute('SELECT COUNT(*) as count FROM music_recommendations')
    
    if (musicRows[0].count === 0) {
      // Insert sample music recommendations
      await connection.execute(
        'INSERT INTO music_recommendations (mood_type, title, artist, duration, description, youtube_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
        [
          'Happy', 'Happy', 'Pharrell Williams', '3:53', 'Upbeat and cheerful song to boost your mood', 'https://www.youtube.com/watch?v=ZbZSe6N_BXs',
          'Happy', 'Good as Hell', 'Lizzo', '3:37', 'Empowering track for confidence boost', 'https://www.youtube.com/watch?v=CHM2G32qP6A',
          'Happy', 'Can\'t Stop the Feeling', 'Justin Timberlake', '3:56', 'Feel-good pop song', 'https://www.youtube.com/watch?v=CKidv2P9IX8'
        ]
      )
      
      await connection.execute(
        'INSERT INTO music_recommendations (mood_type, title, artist, duration, description, youtube_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
        [
          'Sad', 'Someone Like You', 'Adele', '4:45', 'Emotional ballad for sad moments', 'https://www.youtube.com/watch?v=hLQl3wQQFQ0',
          'Sad', 'Fix You', 'Coldplay', '4:55', 'Comforting song for difficult times', 'https://www.youtube.com/watch?v=k4V3Mo61fJM',
          'Sad', 'Mad World', 'Gary Jules', '3:08', 'Melancholic and reflective', 'https://www.youtube.com/watch?v=4N3N1MlvVc4'
        ]
      )
      
      await connection.execute(
        'INSERT INTO music_recommendations (mood_type, title, artist, duration, description, youtube_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
        [
          'Anxious', 'Weightless', 'Marconi Union', '8:08', 'Scientifically proven to reduce anxiety', 'https://www.youtube.com/watch?v=1ZYbU82GVz4',
          'Anxious', 'River Flows in You', 'Yiruma', '3:05', 'Calming piano music', 'https://www.youtube.com/watch?v=7maJOI3QMu0',
          'Anxious', 'Clair de Lune', 'Claude Debussy', '5:08', 'Peaceful classical piece', 'https://www.youtube.com/watch?v=Qv6fvp-8qy8'
        ]
      )

      // Hindi Songs for Happy Mood
      await connection.execute(
        'INSERT INTO music_recommendations (mood_type, title, artist, duration, description, youtube_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
        [
          'Happy', 'Nagada Sang Dhol', 'Shreya Ghoshal', '4:23', 'Energetic Gujarati folk song', 'https://www.youtube.com/watch?v=HrK4HQn2D08',
          'Happy', 'London Thumakda', 'Labh Janjua', '4:13', 'Punjabi celebration song', 'https://www.youtube.com/watch?v=kTIVpJ2E7qM',
          'Happy', 'Gallan Goodiyaan', 'Shankar-Ehsaan-Loy', '4:44', 'Upbeat Bollywood song', 'https://www.youtube.com/watch?v=9a1Jk1A_xzE'
        ]
      )

      // Hindi Songs for Sad/Relaxed Mood
      await connection.execute(
        'INSERT INTO music_recommendations (mood_type, title, artist, duration, description, youtube_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
        [
          'Calm', 'Tum Hi Ho', 'Arijit Singh', '4:23', 'Romantic soft melody', 'https://www.youtube.com/watch?v=U_j5qebXK3A',
          'Calm', 'Raabta', 'Arijit Singh', '4:55', 'Soulful romantic song', 'https://www.youtube.com/watch?v=mhQYkblt5R4',
          'Calm', 'Mann Mera', 'Gajendra Verma', '4:40', 'Peaceful emotional song', 'https://www.youtube.com/watch?v=Qh4uJh6a2_g'
        ]
      )

      // Soft English Songs
      await connection.execute(
        'INSERT INTO music_recommendations (mood_type, title, artist, duration, description, youtube_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
        [
          'Calm', 'Perfect', 'Ed Sheeran', '4:23', 'Soft romantic melody', 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
          'Calm', 'Thinking Out Loud', 'Ed Sheeran', '4:41', 'Gentle acoustic song', 'https://www.youtube.com/watch?v=lp-EO5I60KA',
          'Calm', 'All of Me', 'John Legend', '4:30', 'Beautiful piano ballad', 'https://www.youtube.com/watch?v=450p7goxZqg'
        ]
      )

      // Excited Mood Songs
      await connection.execute(
        'INSERT INTO music_recommendations (mood_type, title, artist, duration, description, youtube_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
        [
          'Excited', 'Uptown Funk', 'Mark Ronson ft. Bruno Mars', '4:30', 'High energy funk', 'https://www.youtube.com/watch?v=OPf0YbXqDm0',
          'Excited', 'Levitating', 'Dua Lipa', '3:23', 'Upbeat pop dance song', 'https://www.youtube.com/watch?v=TUVcZfQe-K8',
          'Excited', 'Senorita', 'Shawn Mendes & Camila Cabello', '3:11', 'Energetic duet', 'https://www.youtube.com/watch?v=Pkh8Ut1jG0Y'
        ]
      )

      // Angry Mood Songs (Rock/Metal)
      await connection.execute(
        'INSERT INTO music_recommendations (mood_type, title, artist, duration, description, youtube_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
        [
          'Angry', 'Killing in the Name', 'Rage Against the Machine', '5:14', 'Release anger with rock', 'https://www.youtube.com/watch?v=bWXazVhlyxQ',
          'Angry', 'Bodies', 'Drowning Pool', '3:22', 'Aggressive energy', 'https://www.youtube.com/watch?v=06R2kEQk_cA',
          'Angry', 'Break Stuff', 'Limp Bizkit', '2:46', 'Channel frustration', 'https://www.youtube.com/watch?v=ZpUYjpKg9KY'
        ]
      )

      // Tired Mood Songs (Soft/Relaxing)
      await connection.execute(
        'INSERT INTO music_recommendations (mood_type, title, artist, duration, description, youtube_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
        [
          'Tired', 'Sleepyhead', 'Passion Pit', '3:30', 'Dreamy vibes', 'https://www.youtube.com/watch?v=AzP9h8f0t_k',
          'Tired', 'River', 'Joni Mitchell', '4:32', 'Gentle flow', 'https://www.youtube.com/watch?v=liIb-iZiA6E',
          'Tired', 'To Build A Home', 'The Cinematic Orchestra', '6:11', 'Peaceful and calming', 'https://www.youtube.com/watch?v=aw29NPU6nsA'
        ]
      )

      // Confident Mood Songs
      await connection.execute(
        'INSERT INTO music_recommendations (mood_type, title, artist, duration, description, youtube_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
        [
          'Confident', 'Eye of the Tiger', 'Survivor', '4:04', 'Motivational rock', 'https://www.youtube.com/watch?v=btPJPFnesV4',
          'Confident', 'Stronger', 'Kelly Clarkson', '3:42', 'Empowering pop', 'https://www.youtube.com/watch?v=XjwVXq28Iak',
          'Confident', 'Lose Yourself', 'Eminem', '5:26', 'Determination hip-hop', 'https://www.youtube.com/watch?v=_Yhyp-_hX2s'
        ]
      )

      // Confused Mood Songs (Thoughtful)
      await connection.execute(
        'INSERT INTO music_recommendations (mood_type, title, artist, duration, description, youtube_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
        [
          'Confused', 'Bohemian Rhapsody', 'Queen', '5:55', 'Complex emotions', 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
          'Confused', 'Paranoid Android', 'Radiohead', '6:23', 'Thoughtful alternative', 'https://www.youtube.com/watch?v=0hiUuL3iTTc',
          'Confused', 'Losing My Religion', 'R.E.M.', '4:28', 'Reflective rock', 'https://www.youtube.com/watch?v=xwtdhWltSIg'
        ]
      )
      
      // Insert sample activity recommendations
      const activityData = [
        ['Happy', 'Morning Walk', '20-minute walk in nature to boost serotonin', '20 min'],
        ['Happy', 'Call a Friend', 'Share your happiness with someone you care about', '15 min'],
        ['Happy', 'Dance Party', 'Put on your favorite music and dance like nobody\'s watching', '10 min'],
        ['Sad', 'Watch a Comfort Movie', 'Put on your favorite feel-good movie', '2 hours'],
        ['Sad', 'Talk to a Friend', 'Share your feelings with someone you trust', '30 min'],
        ['Sad', 'Journaling', 'Write down your thoughts and feelings', '15 min'],
        ['Anxious', 'Deep Breathing', '5-minute breathing exercise to calm your mind', '5 min'],
        ['Anxious', 'Meditation', 'Guided meditation for anxiety relief', '10 min'],
        ['Anxious', 'Progressive Muscle Relaxation', 'Release tension from your body', '15 min']
      ]
      
      await connection.execute(
        'INSERT INTO activity_recommendations (mood_type, title, description, duration) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
        [
          'Happy', 'Morning Walk', '20-minute walk in nature to boost serotonin', '20 min',
          'Happy', 'Call a Friend', 'Share your happiness with someone you care about', '15 min',
          'Happy', 'Dance Party', 'Put on your favorite music and dance like nobody\'s watching', '10 min'
        ]
      )
      
      await connection.execute(
        'INSERT INTO activity_recommendations (mood_type, title, description, duration) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
        [
          'Sad', 'Watch a Comfort Movie', 'Put on your favorite feel-good movie', '2 hours',
          'Sad', 'Talk to a Friend', 'Share your feelings with someone you trust', '30 min',
          'Sad', 'Journaling', 'Write down your thoughts and feelings', '15 min'
        ]
      )
      
      await connection.execute(
        'INSERT INTO activity_recommendations (mood_type, title, description, duration) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
        [
          'Anxious', 'Deep Breathing', '5-minute breathing exercise to calm your mind', '5 min',
          'Anxious', 'Meditation', 'Guided meditation for anxiety relief', '10 min',
          'Anxious', 'Progressive Muscle Relaxation', 'Release tension from your body', '15 min'
        ]
      )
      
      // Insert sample quote recommendations
      const quoteData = [
        ['Happy', 'The only way to do great work is to love what you do.', 'Steve Jobs'],
        ['Happy', 'Happiness is not by chance, but by choice.', 'Jim Rohn'],
        ['Happy', 'The purpose of our lives is to be happy.', 'Dalai Lama'],
        ['Sad', 'Every moment is a fresh beginning.', 'T.S. Eliot'],
        ['Sad', 'This too shall pass.', 'Persian Proverb'],
        ['Sad', 'Tears are words that need to be written.', 'Paulo Coelho'],
        ['Anxious', 'Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.', 'Oprah Winfrey'],
        ['Anxious', 'Anxiety is the dizziness of freedom.', 'Søren Kierkegaard'],
        ['Anxious', 'You don\'t have to control your thoughts. You just have to stop letting them control you.', 'Dan Millman']
      ]
      
      await connection.execute(
        'INSERT INTO quote_recommendations (mood_type, quote, author) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)',
        [
          'Happy', 'The only way to do great work is to love what you do.', 'Steve Jobs',
          'Happy', 'Happiness is not by chance, but by choice.', 'Jim Rohn',
          'Happy', 'The purpose of our lives is to be happy.', 'Dalai Lama'
        ]
      )
      
      await connection.execute(
        'INSERT INTO quote_recommendations (mood_type, quote, author) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)',
        [
          'Sad', 'Every moment is a fresh beginning.', 'T.S. Eliot',
          'Sad', 'This too shall pass.', 'Persian Proverb',
          'Sad', 'Tears are words that need to be written.', 'Paulo Coelho'
        ]
      )
      
      await connection.execute(
        'INSERT INTO quote_recommendations (mood_type, quote, author) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)',
        [
          'Anxious', 'Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.', 'Oprah Winfrey',
          'Anxious', 'Anxiety is the dizziness of freedom.', 'Søren Kierkegaard',
          'Anxious', 'You don\'t have to control your thoughts. You just have to stop letting them control you.', 'Dan Millman'
        ]
      )
      
      console.log('✅ Sample recommendations seeded successfully')
    }
    
    connection.release()
  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
  }
}

module.exports = {
  pool,
  testConnection,
  initializeDatabase,
  seedRecommendations
}
