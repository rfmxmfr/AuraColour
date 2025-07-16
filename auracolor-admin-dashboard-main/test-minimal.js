// Final test after disabling middleware
const BASE_URL = 'https://firebase-deploy-45h6701x4-renatos-projects-ef7b1af8.vercel.app'

async function testDebug() {
  console.log('🔍 Testing Debug API...')
  
  try {
    const response = await fetch(`${BASE_URL}/api/debug`)
    const data = await response.json()
    console.log(`Status: ${response.status}`)
    console.log('Response:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.log('❌ Debug Error:', error.message)
  }
}

async function testMinimalBooking() {
  console.log('\n🔧 Testing Minimal Booking API...')
  
  const bookingData = {
    name: 'Test User',
    email: 'test@example.com',
    service: 'color-analysis'
  }
  
  try {
    const response = await fetch(`${BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    })
    
    const data = await response.json()
    console.log(`Status: ${response.status}`)
    console.log('Response:', JSON.stringify(data, null, 2))
    
    if (data.success) {
      console.log('🎉 API ROUTES FINALLY WORKING!')
    }
  } catch (error) {
    console.log('❌ Booking Error:', error.message)
  }
}

async function runTests() {
  await testDebug()
  await testMinimalBooking()
}

runTests()