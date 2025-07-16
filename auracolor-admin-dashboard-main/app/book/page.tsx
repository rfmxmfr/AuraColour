'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const services = [
    { id: 'color-analysis', name: '12-Season Color Analysis', price: '£75' },
    { id: 'virtual-wardrobe', name: 'Virtual Wardrobe Curation', price: '£100' },
    { id: 'personal-shopping', name: 'Personal Shopping Service', price: '£150' },
    { id: 'style-coaching', name: 'Style Evolution Coaching', price: '£300' },
    { id: 'gift-vouchers', name: 'Gift Vouchers', price: 'From £75' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (response.ok) {
        alert(`Booking successful! Reference: ${result.booking_number}`)
        window.location.href = '/success?booking=completed'
      } else {
        alert(`Booking failed: ${result.error}`)
      }
    } catch (error) {
      alert('Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">Book Your Service</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Schedule your style transformation today
            </p>
          </div>

          <Card className="bg-white/20 backdrop-blur-xl border border-white/30">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Service Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="service" className="text-gray-700 font-semibold">Select Service</Label>
                  <Select onValueChange={(value) => setFormData({...formData, service: value})}>
                    <SelectTrigger className="bg-white/50">
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - {service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-semibold">Full Name</Label>
                    <Input
                      id="name"
                      className="bg-white/50"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className="bg-white/50"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number</Label>
                    <Input
                      id="phone"
                      className="bg-white/50"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date" className="text-gray-700 font-semibold">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      className="bg-white/50"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 font-semibold">Additional Message</Label>
                  <Textarea
                    id="message"
                    className="bg-white/50"
                    placeholder="Tell us about your style goals or any specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    Book Service
                  </Button>
                  <Link href="/services">
                    <Button variant="outline" className="px-6">
                      Back to Services
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}