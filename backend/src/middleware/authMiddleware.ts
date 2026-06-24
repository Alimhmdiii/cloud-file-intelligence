import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/env'
import { JwtPayload } from '../types'

export interface AuthRequest extends Request {
  user?: JwtPayload
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Login required' })
    return
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}