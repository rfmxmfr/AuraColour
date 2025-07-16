// Test final fix - all async createClient calls removed
const LATEST_URL = 'https://firebase-deploy-qhz52rv1u-renatos-projects-ef7b1af8.vercel.app'

async function testFinalFix() {
  console.log('🎯 TESTING FINAL FIX - All async createClient() calls removed')
  console.log(`URL: ${LATEST_URL}`)
  
  try {
    // Test homepage
    const homeResponse = await fetch(LATEST_URL)
    console.log(`🏠 Homepage: ${homeResponse.status} ${homeResponse.ok ? '✅' : '❌'}`)
    
    // Test admin
    const adminResponse = await fetch(`${LATEST_URL}/admin`)
    console.log(`👑 Admin: ${adminResponse.status} ${adminResponse.ok ? '✅' : '❌'}`)
    
    // Test debug API
    const debugResponse = await fetch(`${LATEST_URL}/api/debug`)
    console.log(`🔧 Debug API: ${debugResponse.status} ${debugResponse.ok ? '✅' : '❌'}`)
    
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
    
    if (homeResponse.ok && adminResponse.ok && debugResponse.ok && bookingResponse.ok) {
      console.log('\n🎉 ALL CRITICAL ISSUES FIXED!')
      console.log('🌐 Frontend: Working')
      console.log('👑 Admin Dashboard: Accessible')
      console.log('🔧 APIs: Functional')
      console.log('\n📋 ADMIN ACCESS:')
      console.log(`Dashboard: ${LATEST_URL}/admin`)
      console.log('Features: Bookings, Reports, Analytics, ML Insights')
    } else {
      console.log('\n❌ Some issues remain - check individual responses above')
    }
    
  } catch (error) {
    console.log('❌ Network Error:', error.message)
  }
}

testFinalFix()