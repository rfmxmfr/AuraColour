// Test environment variables in production
const LATEST_URL = 'https://firebase-deploy-kgxmljkg0-renatos-projects-ef7b1af8.vercel.app'

async function testEnvDebug() {
  // console.log('🔍 Testing Environment Variables...')
  
  try {
    const response = await fetch(`${ LATEST_URL }/api/debug`)
    
    if (response.ok) {
      const data = await response.json()
      // console.log('✅ API Working!')
      // console.log('Environment:', data.env)
    } else {
      // console.log(`❌ API Status: ${ response.status }`)
      const text = await response.text()
      // console.log('Response preview:', text.substring(0, 200))
    }
    
  } catch (error) {
    // console.log('❌ Network Error:', error.message)
  }
}

testEnvDebug()