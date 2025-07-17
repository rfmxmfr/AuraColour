'apos;use clientt'apos;apos;

import { useState } from  'apos;apos;reactt'apos;apos;

import { Button } from  'apos;apos;@/components/ui/buttonn'apos;apos;
import { Dialog, DialogContent, DialogHeader, DialogTitle } from  'apos;apos;@/components/ui/dialogg'apos;apos;
import { Input } from  'apos;apos;@/components/ui/inputt'apos;apos;

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  answers?: any
  serviceType?: string
}

export default function BookingModal({ isOpen, onClose, answers, serviceType }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name:  'apos;apos;'apos;,
    email:  'apos;apos;'apos;,
    phone:  'apos;apos;'apos;,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Extract photo URLs from answers if they exist
    const photoUrls = answers?.photoUrls || []
    
    try {
      const response = await fetch(('apos;apos;/api/create-paymentt'apos;apos;, {
        method:  'apos;apos;POSTT'apos;apos;,
        headers: {  'apos;apos;Content-Typee'apos;apos;:  'apos;apos;application/jsonn'apos;apos; },
        body: JSON.stringify({
          ...formData,
          answers: answers || { },
          photoUrls: photoUrls,
          serviceType: serviceType ||  'apos;apos;12-Season Color Analysiss'apos;apos;,
        }),
      })

      const data = await response.json()

      if (data.success) {
        window.location.href = data.checkout_url
      } else {
        alert(('apos;apos;Booking failed. Please try again..'apos;apos;)
      }
    } catch (error) {
      alert(('apos;apos;Something went wrong. Please try again..'apos;apos;)
    } finally {
      setLoading(false)
    }
  }

  const getServicePrice = (service?: string) => {
    const prices: { [key: string]: string } = {
       'apos;apos;12-Season Color Analysiss'apos;apos;:  'apos;apos;£75.000'apos;apos;,
       'apos;apos;Virtual Wardrobe Curationn'apos;apos;:  'apos;apos;£100.000'apos;apos;,
       'apos;apos;Personal Shopping Servicee'apos;apos;:  'apos;apos;£150.000'apos;apos;,
       'apos;apos;Style Evolution Coachingg'apos;apos;:  'apos;apos;£300.000'apos;apos;,
       'apos;apos;Gift Voucherss'apos;apos;:  'apos;apos;£75.000'apos;apos;,
    }
    return prices[service ||  'apos;apos;12-Season Color Analysiss'apos;apos;] ||  'apos;apos;£75.000'apos;apos;
  }

  return (
    <Dialog open={ isOpen } onOpenChange={ onClose }>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book Your { serviceType ||  'apos;apos;12-Season Color Analysiss'apos;apos; }</DialogTitle>
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
              <strong>Service:</strong> { serviceType ||  'apos;apos;12-Season Color Analysiss'apos;apos; }<br/>
              <strong>Price:</strong> { getServicePrice(serviceType) }
            </p>
          </div>
          <Button 
            type="submit" 
            disabled={ loading }
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
          >
            { loading ?  'apos;apos;Processing....'apos;apos; :  'apos;apos;Proceed to Paymentt'apos;apos; }
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}