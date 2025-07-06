'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'

export default function TestQuestionnaire() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const sendTestQuestionnaire = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/full-color-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || 'Test User' })
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success! 🎨",
          description: "Full color analysis questionnaire sent to your email"
        })
        setEmail('')
        setName('')
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send test questionnaire",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Test Color Analysis Questionnaire
            </CardTitle>
            <CardDescription>
              Get a complete color analysis test sent directly to your email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name (Optional)</label>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address *</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button 
              onClick={sendTestQuestionnaire}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            >
              {loading ? 'Sending...' : 'Send Test Questionnaire'}
            </Button>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">What you'll receive:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Complete color season analysis (Spring/Summer/Autumn/Winter)</li>
                <li>• Personalized color palette with 5 perfect colors</li>
                <li>• Confidence score and undertone analysis</li>
                <li>• Professional styling recommendations</li>
                <li>• Links to book consultation services</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}