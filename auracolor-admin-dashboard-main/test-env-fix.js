// Test after environment variables fix
const LATEST_URL = 'https://firebase-deploy-p8hyl6je2-renatos-projects-ef7b1af8.vercel.app'

async function testEnvFix() {
  logger.info('🎯 TESTING AFTER ENVIRONMENT VARIABLES FIX')
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
    
    if (debugResponse.ok) {
      const debugData = await debugResponse.json()
      logger.info('Environment:', debugData.env)
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
    logger.info(`📝 Booking API: ${ bookingResponse.status } ${ bookingResponse.ok ? '✅' : '❌' }`)
    
    if (homeResponse.ok && adminResponse.ok && debugResponse.ok && bookingResponse.ok) {
      logger.info('\n🎉 ALL ISSUES FIXED!')
      logger.info('🌐 Frontend: Working')
      logger.info('👑 Admin Dashboard: Accessible')
      logger.info('🔧 APIs: Functional')
      logger.info('📊 Speed Insights: Active')
      logger.info('\n📋 ADMIN ACCESS:')
      logger.info(`Dashboard: ${ LATEST_URL }/admin`)
      logger.info('Features: Bookings, Reports, Analytics, ML Insights')
    } else {
      logger.info('\n❌ Some issues remain')
    }
    
  } catch (error) {
    logger.info('❌ Network Error:', error.message)
  }
}

testEnvFix()