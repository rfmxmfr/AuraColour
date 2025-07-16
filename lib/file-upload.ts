import { createClient } from '@/lib/supabase/server'

export async function uploadImage(file: File, bucket = 'images'): Promise<string | null> {
  try {
    const supabase = await createClient()
    const fileName = `${Date.now()}-${file.name}`
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)
    
    return publicUrl
  } catch (error) {
    console.error('Upload failed:', error)
    return null
  }
}

export async function handleFormData(request: Request) {
  const formData = await request.formData()
  const file = formData.get('image') as File
  const data: any = {}
  
  for (const [key, value] of formData.entries()) {
    if (key !== 'image') {
      data[key] = value
    }
  }
  
  if (file) {
    data.imageUrl = await uploadImage(file)
  }
  
  return data
}