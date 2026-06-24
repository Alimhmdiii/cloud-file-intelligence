import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import {
  analyzeSingleFile,
  analyzeMultipleFiles,
  deleteFile,
  getHistory,
  searchHistory
} from '../controllers/analysisController'
import { authMiddleware } from '../middleware/authMiddleware'
import { analyzeLimiter } from '../middleware/rateLimiter'

const router = Router()

const uploadDir = './uploads'
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    cb(null, Date.now() + '.' + ext)
  }
})

const upload = multer({ storage })

router.post('/analyze', analyzeLimiter, authMiddleware, upload.single('file'), analyzeSingleFile)
router.post('/analyze-multiple', analyzeLimiter, authMiddleware, upload.array('files', 5), analyzeMultipleFiles)
router.delete('/file/:publicId', authMiddleware, deleteFile)
router.get('/history', authMiddleware, getHistory)
router.get('/search', authMiddleware, searchHistory)

export default router
