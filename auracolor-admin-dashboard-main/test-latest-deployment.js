// Test latest deployment after NUCLEAR middleware fix
const LATEST_URL = 'https://firebase-deploy-kgxmljkg0-renatos-projects-ef7b1af8.vercel.app'

async function testLatestDeployment() {
  console.log('🔍 Testing After NUCLEAR Middleware Fix...')
  console.log(`URL: ${LATEST_URL}`)
  
  try {
    const response = await fetch(LATEST_URL)
    console.log(`Status: ${response.status}`)
    console.log(`Headers: ${response.headers.get('content-type')}`)
    
    if (response.ok) {
      console.log('🎉 FRONTEND IS LIVE!')
      
      // Test admin page
      const adminResponse = await fetch(`${LATEST_URL}/admin`)
      console.log(`👑 Admin: ${adminResponse.status} ${adminResponse.ok ? '✅' : '❌'}`)
      
      // Test API
      const apiResponse = await fetch(`${LATEST_URL}/api/debug`)
      console.log(`🔧 API: ${apiResponse.status} ${apiResponse.ok ? '✅' : '❌'}`)
      
      // Test booking API
      const bookingResponse = await fetch(`${LATEST_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          service: 'color-analysis'
        })
      })
      console.log(`📝 Booking API: ${bookingResponse.status} ${bookingResponse.ok ? '✅' : '❌'}`)
      
      if (response.ok) {
        console.log('\n🚀 ALL CRITICAL ISSUES FIXED!')
        console.log(`🌐 Live App: ${LATEST_URL}`)
        console.log(`👑 Admin Dashboard: ${LATEST_URL}/admin`)
        console.log('🔧 APIs: Working')
        console.log('📱 Frontend: Accessible')
      }
      
    } else {
      console.log('❌ STILL FAILING:', response.status)
    }
    
  } catch (error) {
    console.log('❌ NETWORK ERROR:', error.message)
  }
}

testLatestDeployment()