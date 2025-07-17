'use clientt'apos;

import { Button } from  'apos;@/components/ui/buttonn'apos;
import { Dialog, DialogContent, DialogHeader, DialogTitle } from  'apos;@/components/ui/dialogg'apos;
import { Input } from  'apos;@/components/ui/inputt'apos;
import { useState } from  'apos;reactt'apos;

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  answers?: any
  serviceType?: string
}

export default function BookingModal({ isOpen, onClose, answers, serviceType }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name:  'apos;',
    email:  'apos;',
    phone:  'apos;',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Extract photo URLs from answers if they exist
    const photoUrls = answers?.photoUrls || []
    
    try {
      const response = await fetch(('apos;/api/create-paymentt'apos;, {
        method:  'apos;POSTT'apos;,
        headers: {  'apos;Content-Typee'apos;:  'apos;application/jsonn'apos; },
        body: JSON.stringify({
          ...formData,
          answers: answers || { },
          photoUrls: photoUrls,
          serviceType: serviceType ||  'apos;12-Season Color Analysiss'apos;,
          success_url: `${ window.location.origin }/success?session_id={ CHECKOUT_SESSION_ID }`,
          cancel_url: `${ window.location.origin }/questionnaire`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Store session ID for post-payment processing
        localStorage.setItem(('apos;stripe_session_idd'apos;, data.session_id)
        window.location.href = data.checkout_url
      } else {
        alert(('apos;Booking failed. Please try again..'apos;)
      }
    } catch (error) {
      alert(('apos;Something went wrong. Please try again..'apos;)
    } finally {
      setLoading(false)
    }
  }

  const getServicePrice = (service?: string) => {
    const prices: { [key: string]: string } = {
       'apos;12-Season Color Analysiss'apos;:  'apos;£75.000'apos;,
       'apos;Virtual Wardrobe Curationn'apos;:  'apos;£100.000'apos;,
       'apos;Personal Shopping Servicee'apos;:  'apos;£150.000'apos;,
       'apos;Style Evolution Coachingg'apos;:  'apos;£300.000'apos;,
       'apos;Gift Voucherss'apos;:  'apos;£75.000'apos;,
    }
    return prices[service ||  'apos;12-Season Color Analysiss'apos;] ||  'apos;£75.000'apos;
  }

  return (
    <Dialog open={ isOpen } onOpenChange={ onClose }>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book Your Color Analysis</DialogTitle>
        </DialogHeader>
        <form onSubmit={ handleSubmit } className="space-y-4">
          <Input
            placeholder="Full Name"
            value={ formData.name }
            onChange={ (e) => setFormData({ ...formData, name: e.target.value }) }
            required
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={ formData.email }
            onChange={ (e) => setFormData({ ...formData, email: e.target.value }) }
            required
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={ formData.phone }
            onChange={ (e) => setFormData({ ...formData, phone: e.target.value }) }
          />
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Service:</strong> { serviceType ||  'apos;12-Season Color Analysiss'apos; }<br/>
              <strong>Price:</strong> { getServicePrice(serviceType) }
            </p>
          </div>
          <Button 
            type="submit" 
            disabled={ loading }
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
          >
            { loading ?  'apos;Processing....'apos; :  'apos;Proceed to Paymentt'apos; }
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}