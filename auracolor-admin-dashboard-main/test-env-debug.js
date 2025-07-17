// Test environment variables in production
const LATEST_URL = 'https://firebase-deploy-kgxmljkg0-renatos-projects-ef7b1af8.vercel.app'

async function testEnvDebug() {
  logger.info('🔍 Testing Environment Variables...')
  
  try {
    const response = await fetch(`${ LATEST_URL }/api/debug`)
    
    if (response.ok) {
      const data = await response.json()
      logger.info('✅ API Working!')
      logger.info('Environment:', data.env)
    } else {
      logger.info(`❌ API Status: ${ response.status }`)
      const text = await response.text()
      logger.info('Response preview:', text.substring(0, 200))
    }
    
  } catch (error) {
    logger.info('❌ Network Error:', error.message)
  }
}

testEnvDebug()