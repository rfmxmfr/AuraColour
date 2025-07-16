'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  answers?: any
  serviceType?: string
}

export default function BookingModal({ isOpen, onClose, answers, serviceType }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Extract photo URLs from answers if they exist
    const photoUrls = answers?.photoUrls || []
    
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          answers: answers || {},
          photoUrls: photoUrls,
          serviceType: serviceType || '12-Season Color Analysis',
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/questionnaire`
        })
      })

      const data = await response.json()

      if (data.success) {
        // Store session ID for post-payment processing
        localStorage.setItem('stripe_session_id', data.session_id)
        window.location.href = data.checkout_url
      } else {
        alert('Booking failed. Please try again.')
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getServicePrice = (service?: string) => {
    const prices: { [key: string]: string } = {
      '12-Season Color Analysis': '£75.00',
      'Virtual Wardrobe Curation': '£100.00',
      'Personal Shopping Service': '£150.00',
      'Style Evolution Coaching': '£300.00',
      'Gift Vouchers': '£75.00'
    }
    return prices[service || '12-Season Color Analysis'] || '£75.00'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book Your Color Analysis</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Service:</strong> {serviceType || '12-Season Color Analysis'}<br/>
              <strong>Price:</strong> {getServicePrice(serviceType)}
            </p>
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}