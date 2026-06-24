import { Response } from 'express'
import fs from 'fs'
import { AuthRequest } from '../middleware/authMiddleware'
import { analyzeWithAI } from '../services/aiService'
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudService'
import { saveAnalysis, getAnalyses, searchAnalyses } from '../db/database'
import { AnalysisMode } from '../types'

function fixFilename(originalName: string): string {
  return Buffer.from(originalName, 'latin1').toString('utf8')
}

export async function analyzeSingleFile(req: AuthRequest, res: Response): Promise<void> {
  const file = (req as any).file
  if (!file) {
    res.status(400).json({ error: 'No file uploaded' })
    return
  }
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }

  const mode = (req.body.mode || 'summary') as AnalysisMode
  const question = req.body.question
  const category = req.body.category || 'General'
  const mimeType = file.mimetype
  const isImage = mimeType.startsWith('image/')

  try {
    const cloudData = await uploadToCloudinary(file.path, mimeType)
    const result = await analyzeWithAI(file.path, mimeType, mode, question)

    if (fs.existsSync(file.path)) fs.unlinkSync(file.path)

    const fixedFilename = fixFilename(file.originalname)

    saveAnalysis({
      userId: req.user.id,
      filename: fixedFilename,
      filesize: file.size,
      filetype: mimeType,
      mode,
      result,
      cloudUrl: cloudData.url,
      publicId: cloudData.publicId,
      category
    })

    res.json({
      result,
      mode,
      cloudUrl: cloudData.url,
      publicId: cloudData.publicId,
      resourceType: cloudData.resourceType,
      isImage
    })
  } catch (err: any) {
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path)
    res.status(500).json({ error: 'Analysis failed: ' + err.message })
  }
}

export async function analyzeMultipleFiles(req: AuthRequest, res: Response): Promise<void> {
  const files = (req as any).files
  if (!files || files.length === 0) {
    res.status(400).json({ error: 'No files uploaded' })
    return
  }
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }

  const mode = (req.body.mode || 'summary') as AnalysisMode
  const category = req.body.category || 'General'
  const results: any[] = []

  for (const file of files) {
    try {
      const mimeType = file.mimetype
      const isImage = mimeType.startsWith('image/')
      const cloudData = await uploadToCloudinary(file.path, mimeType)
      const result = await analyzeWithAI(file.path, mimeType, mode)

      if (fs.existsSync(file.path)) fs.unlinkSync(file.path)

      const fixedFilename = fixFilename(file.originalname)

      saveAnalysis({
        userId: req.user.id,
        filename: fixedFilename,
        filesize: file.size,
        filetype: mimeType,
        mode,
        result,
        cloudUrl: cloudData.url,
        publicId: cloudData.publicId,
        category
      })

      results.push({
        filename: fixedFilename,
        result,
        cloudUrl: cloudData.url,
        publicId: cloudData.publicId,
        resourceType: cloudData.resourceType,
        isImage
      })
    } catch (err: any) {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path)
      results.push({ filename: file.originalname, error: err.message })
    }
  }

  res.json({ results })
}

export async function deleteFile(req: AuthRequest, res: Response): Promise<void> {
  try {
    const publicId = decodeURIComponent(req.params.publicId as string)
    const resourceType = (Array.isArray(req.query.resourceType) ? req.query.resourceType[0] : req.query.resourceType) as string || 'raw'
    await deleteFromCloudinary(publicId, resourceType)
    res.json({ message: 'File deleted' })
  } catch (err: any) {
    res.status(500).json({ error: 'Delete failed: ' + err.message })
  }
}

export function getHistory(req: AuthRequest, res: Response): void {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }
  try {
    const analyses = getAnalyses(req.user.id)
    res.json(analyses)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export function searchHistory(req: AuthRequest, res: Response): void {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }
  try {
    const query = (req.query.q as string) || ''
    const results = searchAnalyses(query, req.user.id)
    res.json(results)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}