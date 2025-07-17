// Live App Test Script
const BASE_URL = 'https://firebase-deploy-ecru.vercel.app'

async function testLiveApp() {
  // console.log('🔍 Testing Live App...\n')
  
  // Test Frontend Pages
  // console.log('📄 Frontend Pages:')
  const pages = ['/', '/services', '/questionnaire', '/book', '/payment', '/admin', '/vouchers']
  
  for (const page of pages) {
    try {
      const response = await fetch(`${ BASE_URL }${ page }`)
      const isHTML = response.headers.get('content-type')?.includes('text/html')
      // console.log(`${ response.ok ? '✅' : '❌' } ${ page }: ${ response.status } ${ isHTML ? '(HTML)' : '(JSON)' }`)
    } catch (error) {
      // console.log(`❌ ${ page }: ERROR - ${ error.message }`)
    }
  }
  
  // console.log('\n🔧 API Endpoints:')
  
  // Test Booking API
  try {
    const bookingResponse = await fetch(`${ BASE_URL }/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        service: 'color-analysis',
        phone: '123456789',
      }),
    })
    
    const isJSON = bookingResponse.headers.get('content-type')?.includes('application/json')
    // console.log(`${ bookingResponse.ok ? '✅' : '❌' } POST /api/bookings: ${ bookingResponse.status } ${ isJSON ? '(JSON)' : '(HTML)' }`)
    
    if (isJSON && bookingResponse.ok) {
      const data = await bookingResponse.json()
      // console.log(`   Booking ID: ${ data.booking_id || 'N/A' }`)
    }
  } catch (error) {
    // console.log(`❌ POST /api/bookings: ERROR - ${ error.message }`)
  }
  
  // Test Payment Intent
  try {
    const paymentResponse = await fetch(`${ BASE_URL }/api/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceId: 'color-analysis',
        clientEmail: 'test@example.com',
      }),
    })
    
    const isJSON = paymentResponse.headers.get('content-type')?.includes('application/json')
    // console.log(`${ paymentResponse.ok ? '✅' : '❌' } POST /api/create-payment-intent: ${ paymentResponse.status } ${ isJSON ? '(JSON)' : '(HTML)' }`)
    
    if (isJSON && paymentResponse.ok) {
      const data = await paymentResponse.json()
      // console.log(`   Client Secret: ${ data.clientSecret ? 'Generated' : 'Missing' }`)
    }
  } catch (error) {
    // console.log(`❌ POST /api/create-payment-intent: ERROR - ${ error.message }`)
  }
  
  // Test Voucher API
  try {
    const voucherResponse = await fetch(`${ BASE_URL }/api/vouchers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 75,
        recipientEmail: 'test@example.com',
        purchaserEmail: 'buyer@example.com',
      }),
    })
    
    const isJSON = voucherResponse.headers.get('content-type')?.includes('application/json')
    // console.log(`${ voucherResponse.ok ? '✅' : '❌' } POST /api/vouchers: ${ voucherResponse.status } ${ isJSON ? '(JSON)' : '(HTML)' }`)
    
    if (isJSON && voucherResponse.ok) {
      const data = await voucherResponse.json()
      // console.log(`   Voucher Code: ${ data.voucherCode || 'N/A' }`)
    }
  } catch (error) {
    // console.log(`❌ POST /api/vouchers: ERROR - ${ error.message }`)
  }
  
  // console.log('\n🎯 Live App Test Complete')
}

testLiveApp()