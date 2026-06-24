import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../config/env'
import { createUser, getUserByEmail } from '../db/database'
import { JwtPayload, AuthUser } from '../types'

interface RegisterResult {
  token: string
  user: AuthUser
}

export async function registerUser(name: string, email: string, password: string): Promise<RegisterResult> {
  if (!name || !email || !password) {
    throw new Error('All fields are required')
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters')
  }

  const existing = getUserByEmail(email)
  if (existing) {
    throw new Error('Email already registered')
  }

  const hashed = await bcrypt.hash(password, 10)
  const result = createUser(name, email, hashed)

  const payload: JwtPayload = { id: result.lastInsertRowid, email, name }
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' })

  return {
    token,
    user: { id: result.lastInsertRowid, name, email }
  }
}

export async function loginUser(email: string, password: string): Promise<RegisterResult> {
  if (!email || !password) {
    throw new Error('Email and password required')
  }

  const user = getUserByEmail(email)
  if (!user) {
    throw new Error('Invalid email or password')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid email or password')
  }

  const payload: JwtPayload = { id: user.id, email: user.email, name: user.name }
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' })

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email }
  }
}