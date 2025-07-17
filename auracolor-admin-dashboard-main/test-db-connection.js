// Test database connection
const BASE_URL = 'https://firebase-deploy-fvgnw3ioy-renatos-projects-ef7b1af8.vercel.app'

async function testDatabase() {
  // console.log('🔍 Testing Database Connection...')
  
  try {
    const response = await fetch(`${ BASE_URL }/api/test-db`)
    const data = await response.json()
    
    // console.log(`Status: ${ response.status }`)
    // console.log('Response:', JSON.stringify(data, null, 2))
    
    if (data.status === 'error') {
      // console.log('\n❌ Database Error Details:')
      // console.log('Message:', data.message)
      // console.log('Error:', data.error)
      // console.log('Code:', data.code)
      
      if (data.error?.includes('relation') && data.error?.includes('does not exist')) {
        // console.log('\n🔧 SOLUTION: Missing tables in Supabase')
        // console.log('Run the SQL in create-tables.sql in Supabase SQL Editor')
      }
    } else {
      // console.log('\n✅ Database connection successful!')
    }
    
  } catch (error) {
    // console.log('❌ Request Error:', error.message)
  }
}

testDatabase()