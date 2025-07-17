// Final test after disabling middleware
const BASE_URL = 'https://firebase-deploy-45h6701x4-renatos-projects-ef7b1af8.vercel.app'

async function testDebug() {
  logger.info('🔍 Testing Debug API...')
  
  try {
    const response = await fetch(`${ BASE_URL }/api/debug`)
    const data = await response.json()
    logger.info(`Status: ${ response.status }`)
    logger.info('Response:', JSON.stringify(data, null, 2))
  } catch (error) {
    logger.info('❌ Debug Error:', error.message)
  }
}

async function testMinimalBooking() {
  logger.info('\n🔧 Testing Minimal Booking API...')
  
  const bookingData = {
    name: 'Test User',
    email: 'test@example.com',
    service: 'color-analysis',
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
      logger.info('🎉 API ROUTES FINALLY WORKING!')
    }
  } catch (error) {
    logger.info('❌ Booking Error:', error.message)
  }
}

async function runTests() {
  await testDebug()
  await testMinimalBooking()
}

runTests()