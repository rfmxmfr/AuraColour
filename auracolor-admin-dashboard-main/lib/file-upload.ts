import { createClient } from '@/lib/supabase/client'

export async function uploadImage(file: File, bucket: string, path: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(`Upload failed: ${ error.message }`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return { path: data.path, url: publicUrl }
}

export async function deleteImage(bucket: string, path: string) {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    throw new Error(`Delete failed: ${ error.message }`)
  }
}

export function getImageUrl(bucket: string, path: string) {
  const supabase = createClient()
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return publicUrl
}

export async function handleFormData(formData: FormData) {
  const files: File[] = []
  const data: Record<string, any> = { }
  
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      files.push(value)
    } else {
      data[key] = value
    }
  }
  
  return { files, data }
}