import { Request, Response } from 'express'
import { registerUser, loginUser } from '../services/authService'
import { getUserById } from '../db/database'
import { AuthRequest } from '../middleware/authMiddleware'

export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body
  try {
    const result = await registerUser(name, email, password)
    res.json(result)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body
  try {
    const result = await loginUser(email, password)
    res.json(result)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export function me(req: AuthRequest, res: Response): void {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }
  const user = getUserById(req.user.id)
  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }
  res.json(user)
}