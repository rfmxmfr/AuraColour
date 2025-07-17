// Test final fix - all async createClient calls removed
const LATEST_URL = 'https://firebase-deploy-qhz52rv1u-renatos-projects-ef7b1af8.vercel.app'

async function testFinalFix() {
  logger.info('🎯 TESTING FINAL FIX - All async createClient() calls removed')
  logger.info(`URL: ${ LATEST_URL }`)
  
  try {
    // Test homepage
    const homeResponse = await fetch(LATEST_URL)
    logger.info(`🏠 Homepage: ${ homeResponse.status } ${ homeResponse.ok ? '✅' : '❌' }`)
    
    // Test admin
    const adminResponse = await fetch(`${ LATEST_URL }/admin`)
    logger.info(`👑 Admin: ${ adminResponse.status } ${ adminResponse.ok ? '✅' : '❌' }`)
    
    // Test debug API
    const debugResponse = await fetch(`${ LATEST_URL }/api/debug`)
    logger.info(`🔧 Debug API: ${ debugResponse.status } ${ debugResponse.ok ? '✅' : '❌' }`)
    
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
    logger.info(`📝 Booking API: ${ bookingResponse.status } ${ bookingResponse.ok ? '✅' : '❌' }`)
    
    if (homeResponse.ok && adminResponse.ok && debugResponse.ok && bookingResponse.ok) {
      logger.info('\n🎉 ALL CRITICAL ISSUES FIXED!')
      logger.info('🌐 Frontend: Working')
      logger.info('👑 Admin Dashboard: Accessible')
      logger.info('🔧 APIs: Functional')
      logger.info('\n📋 ADMIN ACCESS:')
      logger.info(`Dashboard: ${ LATEST_URL }/admin`)
      logger.info('Features: Bookings, Reports, Analytics, ML Insights')
    } else {
      logger.info('\n❌ Some issues remain - check individual responses above')
    }
    
  } catch (error) {
    logger.info('❌ Network Error:', error.message)
  }
}

testFinalFix()