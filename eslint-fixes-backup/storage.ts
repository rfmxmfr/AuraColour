import logger from "../lib/secure-logger";
import { createClient } from './client'

export async function uploadImage(file: File, bucket: string = 'images'): Promise<string | null> {
  try {
    const supabase = createClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${ Date.now() }-${ Math.random().toString(36).substring(2) }.${ fileExt }`
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    logger.error('Upload failed:', error)
    return null
  }
}

export async function deleteImage(url: string, bucket: string = 'images'): Promise<boolean> {
  try {
    const supabase = createClient()
    const fileName = url.split('/').pop()
    if (!fileName) return false

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName])

    return !error
  } catch (error) {
    logger.error('Delete failed:', error)
    return false
  }
}