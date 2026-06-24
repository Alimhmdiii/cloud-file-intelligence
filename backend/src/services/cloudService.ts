import { v2 as cloudinary } from 'cloudinary'
import { config } from '../config/env'
import { CloudUploadResult } from '../types'

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret
})

export async function uploadToCloudinary(filePath: string, mimeType: string): Promise<CloudUploadResult> {
  const isImage = mimeType.startsWith('image/')
  const resourceType = isImage ? 'image' : 'raw'

  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: resourceType,
    folder: 'cloud-file-intelligence',
    access_mode: 'public',
    flags: 'attachment'
  })

  return {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType
  }
}

export async function deleteFromCloudinary(publicId: string, resourceType: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}