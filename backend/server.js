require('dotenv').config()
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const OpenAI = require('openai')
const { PdfReader } = require('pdfreader')

const app = express()
const PORT = process.env.PORT || 3000

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
})

app.use(cors())
app.use(express.json())

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

app.get('/', (req, res) => {
  res.json({ message: 'سرور آماده‌ست!' })
})

async function extractText(filePath, mimeType) {
  if (mimeType === 'application/pdf') {
    return new Promise((resolve, reject) => {
      let text = ''
      new PdfReader().parseFileItems(filePath, (err, item) => {
        if (err) reject(err)
        else if (!item) resolve(text.substring(0, 8000))
        else if (item.text) text += item.text + ' '
      })
    })
  } else {
    return fs.readFileSync(filePath, 'utf8').substring(0, 8000)
  }
}

app.post('/analyze', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'فایلی ارسال نشد' })

  const mode = req.body.mode || 'summary'
  const question = req.body.question
  const mimeType = req.file.mimetype
  const isImage = mimeType.startsWith('image/')

  const prompts = {
    summary: 'یک خلاصه کوتاه و روشن از این متن به فارسی بنویس. حداکثر ۱۵۰ کلمه.',
    keypoints: 'مهم‌ترین نکات این متن را به فارسی و به شکل لیست بنویس. هر نکته با - شروع بشه.',
    qa: question
      ? 'سوال: ' + question + '\n\nفقط بر اساس محتوای متن به فارسی جواب بده.'
      : 'پنج سوال مهم درباره این متن بنویس و جوابشان را بده.'
  }

  try {
    let messages

    if (isImage) {
      const base64 = fs.readFileSync(req.file.path).toString('base64')
      messages = [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}` } },
          { type: 'text', text: prompts[mode] }
        ]
      }]
    } else {
      const text = await extractText(req.file.path, mimeType)
      if (!text || text.trim().length < 10) {
        return res.status(400).json({ error: 'متنی در فایل پیدا نشد' })
      }
      messages = [{
        role: 'user',
        content: `${prompts[mode]}\n\nمتن فایل:\n${text}`
      }]
    }

    const response = await client.chat.completions.create({
      model: 'nex-agi/nex-n2-pro:free',
      messages
    })

    const result = response.choices[0].message.content
    fs.unlinkSync(req.file.path)

    res.json({ result, mode })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'خطا در تحلیل: ' + err.message })
  }
})

app.listen(PORT, () => {
  console.log(`سرور روی پورت ${PORT} اجرا شد`)
  console.log(`آدرس: http://localhost:${PORT}`)
})