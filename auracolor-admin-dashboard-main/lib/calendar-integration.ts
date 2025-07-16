export interface TimeSlot {
  id: string
  date: string
  time: string
  available: boolean
  stylist_id?: string
  duration: number
}

export interface Appointment {
  id: string
  user_id: string
  stylist_id: string
  date: string
  time: string
  duration: number
  service_type: string
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  meeting_url?: string
  notes?: string
  price: number
}

// Generate available time slots for the next 30 days
export function generateAvailableSlots(): TimeSlot[] {
  const slots: TimeSlot[] = []
  const today = new Date()
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue
    
    const dateStr = date.toISOString().split('T')[0]
    
    // Generate slots from 9 AM to 5 PM
    for (let hour = 9; hour < 17; hour++) {
      const timeStr = `${hour.toString().padStart(2, '0')}:00`
      
      slots.push({
        id: `${dateStr}-${timeStr}`,
        date: dateStr,
        time: timeStr,
        available: Math.random() > 0.3, // 70% availability
        duration: 60
      })
    }
  }
  
  return slots
}

export function getAvailableSlots(date?: string): TimeSlot[] {
  const allSlots = generateAvailableSlots()
  
  if (date) {
    return allSlots.filter(slot => slot.date === date && slot.available)
  }
  
  return allSlots.filter(slot => slot.available)
}

export function formatAppointmentTime(date: string, time: string): string {
  const appointmentDate = new Date(`${date}T${time}:00`)
  return appointmentDate.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

export function generateMeetingUrl(): string {
  // In production, integrate with Zoom, Google Meet, or similar
  const meetingId = Math.random().toString(36).substring(2, 15)
  return `https://meet.auracolor.com/room/${meetingId}`
}

export const STYLIST_SERVICES = {
  color_consultation: {
    name: 'Color Consultation',
    duration: 60,
    price: 149,
    description: 'Personal color analysis and styling advice'
  },
  wardrobe_review: {
    name: 'Wardrobe Review',
    duration: 90,
    price: 199,
    description: 'Complete wardrobe assessment and recommendations'
  },
  shopping_session: {
    name: 'Personal Shopping Session',
    duration: 120,
    price: 299,
    description: 'Guided shopping experience with expert stylist'
  },
  style_makeover: {
    name: 'Complete Style Makeover',
    duration: 180,
    price: 499,
    description: 'Comprehensive style transformation package'
  }
}