// Payment Test Script - Run with: node test-payment.js
const BASE_URL = 'https://firebase-deploy-ph47th4gy-renatos-projects-ef7b1af8.vercel.app'

async function testPaymentFlow() {
  logger.info('💳 Testing Payment Flow...\n')
  
  try {
    // 1. Test Payment Intent Creation
    logger.info('1. Creating payment intent...')
    const paymentResponse = await fetch(`${ BASE_URL }/api/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceId: 'color-analysis',
        clientEmail: 'test@example.com',
      }),
    })
    
    const paymentData = await paymentResponse.json()
    logger.info(`✅ Payment Intent: ${ paymentResponse.status }`)
    logger.info(`   Client Secret: ${ paymentData.clientSecret ? 'Generated' : 'Missing' }`)
    logger.info(`   Amount: £${ paymentData.amount || 'N/A' }`)
    
    // 2. Test Booking Creation
    logger.info('\n2. Testing booking creation...')
    const bookingResponse = await fetch(`${ BASE_URL }/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Customer',
        email: 'test@example.com',
        service: 'color-analysis',
        phone: '123456789',
        message: 'Payment test booking',
      }),
    })
    
    const bookingData = await bookingResponse.json()
    logger.info(`✅ Booking: ${ bookingResponse.status }`)
    logger.info(`   Booking ID: ${ bookingData.booking_id || 'N/A' }`)
    logger.info(`   Reference: ${ bookingData.booking_number || 'N/A' }`)
    
    // 3. Test Voucher Creation
    logger.info('\n3. Testing voucher creation...')
    const voucherResponse = await fetch(`${ BASE_URL }/api/vouchers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 75,
        recipientEmail: 'recipient@test.com',
        purchaserEmail: 'buyer@test.com',
        message: 'Test voucher',
      }),
    })
    
    const voucherData = await voucherResponse.json()
    logger.info(`✅ Voucher: ${ voucherResponse.status }`)
    logger.info(`   Code: ${ voucherData.voucherCode || 'N/A' }`)
    
    logger.info('\n🎯 Payment Flow Test Complete')
    
  } catch (error) {
    logger.info(`❌ Payment Test Error: ${ error.message }`)
  }
}

testPaymentFlow()