// Payment Test Script - Run with: node test-payment.js
const BASE_URL = 'https://firebase-deploy-ph47th4gy-renatos-projects-ef7b1af8.vercel.app'

async function testPaymentFlow() {
  console.log('💳 Testing Payment Flow...\n')
  
  try {
    // 1. Test Payment Intent Creation
    console.log('1. Creating payment intent...')
    const paymentResponse = await fetch(`${BASE_URL}/api/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceId: 'color-analysis',
        clientEmail: 'test@example.com'
      })
    })
    
    const paymentData = await paymentResponse.json()
    console.log(`✅ Payment Intent: ${paymentResponse.status}`)
    console.log(`   Client Secret: ${paymentData.clientSecret ? 'Generated' : 'Missing'}`)
    console.log(`   Amount: £${paymentData.amount || 'N/A'}`)
    
    // 2. Test Booking Creation
    console.log('\n2. Testing booking creation...')
    const bookingResponse = await fetch(`${BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Customer',
        email: 'test@example.com',
        service: 'color-analysis',
        phone: '123456789',
        message: 'Payment test booking'
      })
    })
    
    const bookingData = await bookingResponse.json()
    console.log(`✅ Booking: ${bookingResponse.status}`)
    console.log(`   Booking ID: ${bookingData.booking_id || 'N/A'}`)
    console.log(`   Reference: ${bookingData.booking_number || 'N/A'}`)
    
    // 3. Test Voucher Creation
    console.log('\n3. Testing voucher creation...')
    const voucherResponse = await fetch(`${BASE_URL}/api/vouchers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 75,
        recipientEmail: 'recipient@test.com',
        purchaserEmail: 'buyer@test.com',
        message: 'Test voucher'
      })
    })
    
    const voucherData = await voucherResponse.json()
    console.log(`✅ Voucher: ${voucherResponse.status}`)
    console.log(`   Code: ${voucherData.voucherCode || 'N/A'}`)
    
    console.log('\n🎯 Payment Flow Test Complete')
    
  } catch (error) {
    console.log(`❌ Payment Test Error: ${error.message}`)
  }
}

testPaymentFlow()