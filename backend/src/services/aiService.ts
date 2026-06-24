import OpenAI from 'openai'
import fs from 'fs'
import { PdfReader } from 'pdfreader'
import { config } from '../config/env'
import { AnalysisMode } from '../types'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: config.openrouterApiKey
})

const prompts: Record<AnalysisMode, string> = {
  summary: 'CRITICAL INSTRUCTION: First identify the primary language of the text below. Then write your ENTIRE response in that exact same language. Do not translate to English. Write a short and clear summary. Maximum 150 words.',
  keypoints: 'CRITICAL INSTRUCTION: First identify the primary language of the text below. Then write your ENTIRE response in that exact same language. Do not translate to English. List the most important key points. Each point starts with -.',
  qa: 'CRITICAL INSTRUCTION: First identify the primary language of the text below. Then write your ENTIRE response in that exact same language. Do not translate to English. Answer only based on the file content.'
}

export async function extractText(filePath: string, mimeType: string): Promise<string> {
  if (mimeType === 'application/pdf') {
    return new Promise((resolve, reject) => {
      let text = ''
      new PdfReader().parseFileItems(filePath, (err, item) => {
        if (err) reject(err)
        else if (!item) resolve(text.substring(0, 8000))
        else if ('text' in item && item.text) text += item.text + ' '
      })
    })
  }
  return fs.readFileSync(filePath, 'utf8').substring(0, 8000)
}

export async function analyzeWithAI(
  filePath: string,
  mimeType: string,
  mode: AnalysisMode,
  question?: string
): Promise<string> {
  const isImage = mimeType.startsWith('image/')

  let promptText = prompts[mode]
  if (mode === 'qa' && question) {
    promptText = 'Question: ' + question + '\n\n' + prompts.qa
  } else if (mode === 'qa' && !question) {
    promptText = 'Write five important questions about this content and answer them. IMPORTANT: detect the language of the content and respond in that same language.'
  }

  let messages: any

  if (isImage) {
    const base64 = fs.readFileSync(filePath).toString('base64')
    messages = [{
      role: 'user',
      content: [
        { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}` } },
        { type: 'text', text: promptText }
      ]
    }]
  } else {
    const text = await extractText(filePath, mimeType)
    if (!text || text.trim().length < 10) {
      throw new Error('No text found in file')
    }
    messages = [{
      role: 'user',
      content: `${promptText}\n\nFile content:\n${text}`
    }]
  }

  const response = await client.chat.completions.create({
    model: 'openrouter/free',
    messages
  })

  return response.choices[0].message.content || ''
}