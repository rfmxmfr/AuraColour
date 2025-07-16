// Test API after fixing async createClient
const BASE_URL = 'https://firebase-deploy-mftvycpjt-renatos-projects-ef7b1af8.vercel.app'

async function testBookingAPI() {
  console.log('🔧 Testing Booking API after fix...')
  
  const bookingData = {
    name: 'Test User',
    email: 'test@example.com',
    service: 'color-analysis',
    phone: '123456789',
    message: 'Test booking'
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
      console.log('✅ Booking API WORKING!')
      console.log('Booking Number:', data.booking_number)
    } else {
      console.log('❌ Booking failed:', data.error)
    }
  } catch (error) {
    console.log('❌ Request Error:', error.message)
  }
}

async function testVoucherAPI() {
  console.log('\n🎁 Testing Voucher API after fix...')
  
  const voucherData = {
    amount: 75,
    recipientEmail: 'recipient@example.com',
    purchaserEmail: 'buyer@example.com',
    message: 'Gift for you!'
  }
  
  try {
    const response = await fetch(`${BASE_URL}/api/vouchers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(voucherData)
    })
    
    const data = await response.json()
    console.log(`Status: ${response.status}`)
    console.log('Response:', JSON.stringify(data, null, 2))
    
    if (data.success) {
      console.log('✅ Voucher API WORKING!')
      console.log('Voucher Code:', data.voucherCode)
    } else {
      console.log('❌ Voucher failed:', data.error)
    }
  } catch (error) {
    console.log('❌ Request Error:', error.message)
  }
}

async function runTests() {
  await testBookingAPI()
  await testVoucherAPI()
}

runTests()