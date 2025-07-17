// Test database connection
const BASE_URL = 'https://firebase-deploy-fvgnw3ioy-renatos-projects-ef7b1af8.vercel.app'

async function testDatabase() {
  logger.info('🔍 Testing Database Connection...')
  
  try {
    const response = await fetch(`${ BASE_URL }/api/test-db`)
    const data = await response.json()
    
    logger.info(`Status: ${ response.status }`)
    logger.info('Response:', JSON.stringify(data, null, 2))
    
    if (data.status === 'error') {
      logger.info('\n❌ Database Error Details:')
      logger.info('Message:', data.message)
      logger.info('Error:', data.error)
      logger.info('Code:', data.code)
      
      if (data.error?.includes('relation') && data.error?.includes('does not exist')) {
        logger.info('\n🔧 SOLUTION: Missing tables in Supabase')
        logger.info('Run the SQL in create-tables.sql in Supabase SQL Editor')
      }
    } else {
      logger.info('\n✅ Database connection successful!')
    }
    
  } catch (error) {
    logger.info('❌ Request Error:', error.message)
  }
}

testDatabase()