const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { pool } = require('../config/database')

class User {
  // Register new user
  static async create(userData) {
    const { name, email, password } = userData
    
    try {
      // Hash password
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      
      // Insert user into database
      const [result] = await pool.execute(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, passwordHash]
      )
      
      // Get created user
      const [users] = await pool.execute(
        'SELECT id, name, email, created_at FROM users WHERE id = ?',
        [result.insertId]
      )
      
      return users[0]
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists')
      }
      throw error
    }
  }
  
  // Find user by email
  static async findByEmail(email) {
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
    return users[0] || null
  }
  
  // Find user by ID
  static async findById(id) {
    const [users] = await pool.execute(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [id]
    )
    return users[0] || null
  }
  
  // Validate password
  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
  
  // Generate JWT token
  static generateToken(user) {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )
  }
  
  // Update user profile
  static async update(id, userData) {
    const { name } = userData
    const [result] = await pool.execute(
      'UPDATE users SET name = ? WHERE id = ?',
      [name, id]
    )
    
    if (result.affectedRows === 0) {
      throw new Error('User not found')
    }
    
    return await this.findById(id)
  }
  
  // Delete user
  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    )
    
    return result.affectedRows > 0
  }
}

module.exports = User
