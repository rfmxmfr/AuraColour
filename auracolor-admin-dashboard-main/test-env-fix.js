// Test after environment variables fix
const LATEST_URL = 'https://firebase-deploy-p8hyl6je2-renatos-projects-ef7b1af8.vercel.app'

async function testEnvFix() {
  // console.log('🎯 TESTING AFTER ENVIRONMENT VARIABLES FIX')
  // console.log(`URL: ${ LATEST_URL }`)
  
  try {
    // Test homepage
    const homeResponse = await fetch(LATEST_URL)
    // console.log(`🏠 Homepage: ${ homeResponse.status } ${ homeResponse.ok ? '✅' : '❌' }`)
    
    // Test admin
    const adminResponse = await fetch(`${ LATEST_URL }/admin`)
    // console.log(`👑 Admin: ${ adminResponse.status } ${ adminResponse.ok ? '✅' : '❌' }`)
    
    // Test debug API
    const debugResponse = await fetch(`${ LATEST_URL }/api/debug`)
    // console.log(`🔧 Debug API: ${ debugResponse.status } ${ debugResponse.ok ? '✅' : '❌' }`)
    
    if (debugResponse.ok) {
      const debugData = await debugResponse.json()
      // console.log('Environment:', debugData.env)
    }
    
    // Test booking API
    const bookingResponse = await fetch(`${ LATEST_URL }/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        service: 'color-analysis',
      }),
    })
    // console.log(`📝 Booking API: ${ bookingResponse.status } ${ bookingResponse.ok ? '✅' : '❌' }`)
    
    if (homeResponse.ok && adminResponse.ok && debugResponse.ok && bookingResponse.ok) {
      // console.log('\n🎉 ALL ISSUES FIXED!')
      // console.log('🌐 Frontend: Working')
      // console.log('👑 Admin Dashboard: Accessible')
      // console.log('🔧 APIs: Functional')
      // console.log('📊 Speed Insights: Active')
      // console.log('\n📋 ADMIN ACCESS:')
      // console.log(`Dashboard: ${ LATEST_URL }/admin`)
      // console.log('Features: Bookings, Reports, Analytics, ML Insights')
    } else {
      // console.log('\n❌ Some issues remain')
    }
    
  } catch (error) {
    // console.log('❌ Network Error:', error.message)
  }
}

testEnvFix()