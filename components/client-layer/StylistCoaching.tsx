'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StylistCoachingService } from '@/lib/services/stylist-coaching'

export default function StylistCoaching() {
  const [availability, setAvailability] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [appointment, setAppointment] = useState<any>(null)

  useEffect(() => {
    loadAvailability()
  }, [])

  const loadAvailability = async () => {
    try {
      const result = await StylistCoachingService.getAvailability()
      setAvailability(result.availableSlots)
    } catch (error) {
      console.error('Failed to load availability:', error)
    }
  }

  const bookAppointment = async () => {
    if (!selectedSlot) return

    try {
      const result = await StylistCoachingService.bookAppointment(selectedSlot)
      setAppointment(result)
    } catch (error) {
      console.error('Booking failed:', error)
    }
  }

  const startVideoCall = () => {
    if (appointment?.meetingLink) {
      window.open(appointment.meetingLink, '_blank')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Book a Style Consultation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Available Times:</h4>
                <div className="space-y-2">
                  {availability.map((slot) => (
                    <label key={slot} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="timeSlot"
                        value={slot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                      />
                      <span>{new Date(slot).toLocaleString()}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <Button
                onClick={bookAppointment}
                disabled={!selectedSlot}
                className="w-full"
              >
                Book Appointment
              </Button>
            </div>
          </CardContent>
        </Card>

        {appointment && (
          <Card>
            <CardHeader>
              <CardTitle>Your Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Stylist:</strong> {appointment.stylist}</p>
                <p><strong>Date:</strong> {new Date(appointment.datetime).toLocaleString()}</p>
                <p><strong>Appointment ID:</strong> {appointment.appointmentId}</p>
                
                <Button
                  onClick={startVideoCall}
                  className="w-full mt-4"
                >
                  Join Video Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Style Tips & Coaching</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-semibold">Color Matching</h4>
              <p className="text-sm text-gray-600">Learn which colors enhance your natural beauty</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold">Body Type Styling</h4>
              <p className="text-sm text-gray-600">Discover cuts and silhouettes that flatter you</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold">Wardrobe Planning</h4>
              <p className="text-sm text-gray-600">Build a versatile, cohesive wardrobe</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}