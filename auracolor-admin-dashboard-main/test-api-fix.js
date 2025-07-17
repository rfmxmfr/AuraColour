// Test API after fixing async createClient
const BASE_URL = 'https://firebase-deploy-mftvycpjt-renatos-projects-ef7b1af8.vercel.app'

async function testBookingAPI() {
  logger.info('🔧 Testing Booking API after fix...')
  
  const bookingData = {
    name: 'Test User',
    email: 'test@example.com',
    service: 'color-analysis',
    phone: '123456789',
    message: 'Test booking',
  }
  
  try {
    const response = await fetch(`${ BASE_URL }/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    })
    
    const data = await response.json()
    logger.info(`Status: ${ response.status }`)
    logger.info('Response:', JSON.stringify(data, null, 2))
    
    if (data.success) {
      logger.info('✅ Booking API WORKING!')
      logger.info('Booking Number:', data.booking_number)
    } else {
      logger.info('❌ Booking failed:', data.error)
    }
  } catch (error) {
    logger.info('❌ Request Error:', error.message)
  }
}

async function testVoucherAPI() {
  logger.info('\n🎁 Testing Voucher API after fix...')
  
  const voucherData = {
    amount: 75,
    recipientEmail: 'recipient@example.com',
    purchaserEmail: 'buyer@example.com',
    message: 'Gift for you!',
  }
  
  try {
    const response = await fetch(`${ BASE_URL }/api/vouchers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(voucherData),
    })
    
    const data = await response.json()
    logger.info(`Status: ${ response.status }`)
    logger.info('Response:', JSON.stringify(data, null, 2))
    
    if (data.success) {
      logger.info('✅ Voucher API WORKING!')
      logger.info('Voucher Code:', data.voucherCode)
    } else {
      logger.info('❌ Voucher failed:', data.error)
    }
  } catch (error) {
    logger.info('❌ Request Error:', error.message)
  }
}

async function runTests() {
  await testBookingAPI()
  await testVoucherAPI()
}

runTests()