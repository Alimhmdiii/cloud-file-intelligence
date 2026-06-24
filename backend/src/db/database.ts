
import Database from 'better-sqlite3'
import path from 'path'
import { Analysis } from '../types'

const db = new Database(path.join(__dirname, '../../intelligence.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    filename TEXT NOT NULL,
    filesize REAL NOT NULL,
    filetype TEXT NOT NULL,
    mode TEXT NOT NULL,
    result TEXT NOT NULL,
    cloud_url TEXT,
    public_id TEXT,
    category TEXT DEFAULT 'General',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`)

try {
  db.exec('ALTER TABLE analyses ADD COLUMN category TEXT DEFAULT "General"')
} catch {
  // column already exists
}

interface CreateUserResult {
  lastInsertRowid: number
}

export function createUser(name: string, email: string, hashedPassword: string): CreateUserResult {
  const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
  return stmt.run(name, email, hashedPassword) as unknown as CreateUserResult
}

export function getUserByEmail(email: string) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any
}

export function getUserById(id: number) {
  return db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(id) as any
}

interface SaveAnalysisInput {
  userId: number
  filename: string
  filesize: number
  filetype: string
  mode: string
  result: string
  cloudUrl: string
  publicId: string
  category?: string
}

export function saveAnalysis(data: SaveAnalysisInput) {
  const stmt = db.prepare(`
    INSERT INTO analyses (user_id, filename, filesize, filetype, mode, result, cloud_url, public_id, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  return stmt.run(
    data.userId,
    data.filename,
    data.filesize,
    data.filetype,
    data.mode,
    data.result,
    data.cloudUrl,
    data.publicId,
    data.category || 'General'
  )
}

export function getAnalyses(userId: number, limit = 20): Analysis[] {
  return db.prepare('SELECT * FROM analyses WHERE user_id = ? ORDER BY created_at DESC LIMIT ?').all(userId, limit) as Analysis[]
}

export function searchAnalyses(query: string, userId: number): Analysis[] {
  return db.prepare(`
    SELECT * FROM analyses 
    WHERE user_id = ? AND (filename LIKE ? OR result LIKE ?)
    ORDER BY created_at DESC LIMIT 20
  `).all(userId, `%${query}%`, `%${query}%`) as Analysis[]
}

export function deleteAnalysis(id: number) {
  return db.prepare('DELETE FROM analyses WHERE id = ?').run(id)
}

export function getCategories(userId: number): string[] {
  const rows = db.prepare('SELECT DISTINCT category FROM analyses WHERE user_id = ?').all(userId) as { category: string }[]
  return rows.map(r => r.category)
}
