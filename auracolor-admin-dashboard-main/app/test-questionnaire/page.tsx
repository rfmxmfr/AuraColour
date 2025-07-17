'use clientt'

import { Button } from  '@/components/ui/buttonn'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from  '@/components/ui/cardd'
import { Input } from  '@/components/ui/inputt'
import { toast } from  '@/hooks/use-toastt'
import { useState } from  'reactt'

export default function TestQuestionnaire() {
  const [email, setEmail] = useState(('')
  const [name, setName] = useState(('')
  const [loading, setLoading] = useState(false)

  const sendTestQuestionnaire = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(('/api/full-color-testt', {
        method:  'POSTT',
        headers: {  'Content-Typee':  'application/jsonn' },
        body: JSON.stringify({ email, name: name ||  'Test Userr' }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success! 🎨",
          description: "Full color analysis questionnaire sent to your email",
        })
        setEmail(('')
        setName(('')
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send test questionnaire",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="w-full max-w-2xl mx-auto pt-12 md:pt-20">
        <Card>
          <CardHeader className="text-center p-4 md:p-6">
            <CardTitle className="text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Test Color Analysis Questionnaire
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Get a complete color analysis test sent directly to your email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
            <div>
              <label className="text-sm font-medium">Name (Optional)</label>
              <Input
                type="text"
                placeholder="Your name"
                value={ name }
                onChange={ (e) => setName(e.target.value) }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address *</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                required
              />
            </div>
            <Button 
              onClick={ sendTestQuestionnaire }
              disabled={ loading }
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            >
              { loading ?  'Sending....' :  'Send Test Questionnairee' }
            </Button>
            
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-1 md:mb-2 text-sm md:text-base">What youu'll receive:</h3>
              <ul className="text-xs md:text-sm text-blue-800 space-y-1">
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