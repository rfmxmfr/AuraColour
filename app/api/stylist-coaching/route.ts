import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { action, ...data } = await request.json()
  
  switch (action) {
    case 'book-appointment':
      return NextResponse.json({
        appointmentId: 'APT-' + Date.now(),
        stylist: 'Sarah Johnson',
        datetime: data.datetime,
        meetingLink: 'https://meet.style-app.com/room/' + Date.now()
      })
      
    case 'get-availability':
      return NextResponse.json({
        availableSlots: [
          '2024-02-15T10:00:00Z',
          '2024-02-15T14:00:00Z',
          '2024-02-16T09:00:00Z'
        ]
      })
      
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }
}