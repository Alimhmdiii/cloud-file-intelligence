const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, 'intelligence.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    filesize REAL NOT NULL,
    filetype TEXT NOT NULL,
    mode TEXT NOT NULL,
    result TEXT NOT NULL,
    cloud_url TEXT,
    public_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

function saveAnalysis(data) {
  const stmt = db.prepare(`
    INSERT INTO analyses (filename, filesize, filetype, mode, result, cloud_url, public_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  return stmt.run(data.filename, data.filesize, data.filetype, data.mode, data.result, data.cloudUrl, data.publicId)
}

function getAnalyses(limit = 20) {
  return db.prepare('SELECT * FROM analyses ORDER BY created_at DESC LIMIT ?').all(limit)
}

function deleteAnalysis(id) {
  return db.prepare('DELETE FROM analyses WHERE id = ?').run(id)
}

function searchAnalyses(query) {
  return db.prepare(`
    SELECT * FROM analyses 
    WHERE filename LIKE ? OR result LIKE ? 
    ORDER BY created_at DESC LIMIT 20
  `).all(`%${query}%`, `%${query}%`)
}

module.exports = { saveAnalysis, getAnalyses, deleteAnalysis, searchAnalyses }