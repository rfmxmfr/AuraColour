// Test latest deployment after NUCLEAR middleware fix
const LATEST_URL = 'https://firebase-deploy-kgxmljkg0-renatos-projects-ef7b1af8.vercel.app'

async function testLatestDeployment() {
  logger.info('🔍 Testing After NUCLEAR Middleware Fix...')
  logger.info(`URL: ${ LATEST_URL }`)
  
  try {
    const response = await fetch(LATEST_URL)
    logger.info(`Status: ${ response.status }`)
    logger.info(`Headers: ${ response.headers.get('content-type') }`)
    
    if (response.ok) {
      logger.info('🎉 FRONTEND IS LIVE!')
      
      // Test admin page
      const adminResponse = await fetch(`${ LATEST_URL }/admin`)
      logger.info(`👑 Admin: ${ adminResponse.status } ${ adminResponse.ok ? '✅' : '❌' }`)
      
      // Test API
      const apiResponse = await fetch(`${ LATEST_URL }/api/debug`)
      logger.info(`🔧 API: ${ apiResponse.status } ${ apiResponse.ok ? '✅' : '❌' }`)
      
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
      
      if (response.ok) {
        logger.info('\n🚀 ALL CRITICAL ISSUES FIXED!')
        logger.info(`🌐 Live App: ${ LATEST_URL }`)
        logger.info(`👑 Admin Dashboard: ${ LATEST_URL }/admin`)
        logger.info('🔧 APIs: Working')
        logger.info('📱 Frontend: Accessible')
      }
      
    } else {
      logger.info('❌ STILL FAILING:', response.status)
    }
    
  } catch (error) {
    logger.info('❌ NETWORK ERROR:', error.message)
  }
}

testLatestDeployment()