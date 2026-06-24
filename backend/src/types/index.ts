export interface User {
  id: number
  name: string
  email: string
  password: string
  created_at: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
}

export interface JwtPayload {
  id: number
  email: string
  name: string
}

export interface Analysis {
  id: number
  user_id: number
  filename: string
  filesize: number
  filetype: string
  mode: string
  result: string
  cloud_url: string | null
  public_id: string | null
  category: string
  created_at: string
}

export interface CloudUploadResult {
  url: string
  publicId: string
  resourceType: string
}

export interface AnalyzeResponse {
  result: string
  mode: string
  cloudUrl: string
  publicId: string
  resourceType: string
  isImage: boolean
}

export type AnalysisMode = 'summary' | 'keypoints' | 'qa'