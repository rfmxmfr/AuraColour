// Stylist Coaching Service
export class StylistCoachingService {
  static async getAvailability() {
    const response = await fetch('/api/stylist-coaching', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get-availability' }),
    })
    
    return response.json()
  }
  
  static async bookAppointment(datetime: string, notes?: string) {
    const response = await fetch('/api/stylist-coaching', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'book-appointment',
        datetime,
        notes,
      }),
    })
    
    return response.json()
  }
  
  static async startVideoCall(appointmentId: string) {
    // Initialize WebRTC connection
    return {
      meetingLink: `https://meet.style-app.com/room/${ appointmentId }`,
      roomId: appointmentId,
    }
  }
  
  static async getStyleAdvice(photos: File[], preferences: any) {
    const formData = new FormData()
    photos.forEach((photo, index) => {
      formData.append(`photo_${ index }`, photo)
    })
    formData.append('preferences', JSON.stringify(preferences))
    
    const response = await fetch('/api/style-advice', {
      method: 'POST',
      body: formData,
    })
    
    return response.json()
  }
}