// E2E Test Script - Run with: node test-e2e.js
const BASE_URL = 'https://firebase-deploy-bzu4g8pmq-renatos-projects-ef7b1af8.vercel.app'

async function testAPI(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    }
    if (body) options.body = JSON.stringify(body)
    
    const response = await fetch(`${BASE_URL}${endpoint}`, options)
    const data = await response.json()
    
    console.log(`✅ ${method} ${endpoint}: ${response.status}`)
    return { status: response.status, data }
  } catch (error) {
    console.log(`❌ ${method} ${endpoint}: ERROR - ${error.message}`)
    return { status: 'ERROR', error: error.message }
  }
}

async function runE2ETests() {
  console.log('🚀 Starting E2E Tests...\n')
  
  // 1. Test Landing Page
  console.log('📄 Testing Frontend Pages...')
  const pages = ['/', '/services', '/questionnaire', '/book', '/payment', '/admin']
  for (const page of pages) {
    try {
      const response = await fetch(`${BASE_URL}${page}`)
      console.log(`${response.ok ? '✅' : '❌'} Page ${page}: ${response.status}`)
    } catch (error) {
      console.log(`❌ Page ${page}: ERROR`)
    }
  }
  
  console.log('\n🔧 Testing Backend APIs...')
  
  // 2. Test Booking API
  await testAPI('/api/bookings', 'POST', {
    name: 'Test User',
    email: 'test@example.com',
    service: 'color-analysis',
    phone: '123456789',
    message: 'E2E test booking'
  })
  
  // 3. Test Questionnaire API
  await testAPI('/api/questionnaire', 'POST', {
    answers: { 'skin-tone': 'fair', 'hair-color': 'blonde' },
    completedAt: new Date().toISOString()
  })
  
  // 4. Test Voucher API
  await testAPI('/api/vouchers', 'POST', {
    amount: 75,
    recipientEmail: 'recipient@test.com',
    purchaserEmail: 'buyer@test.com',
    message: 'Test voucher'
  })
  
  // 5. Test Payment Intent
  await testAPI('/api/create-payment-intent', 'POST', {
    serviceId: 'color-analysis',
    clientEmail: 'test@example.com'
  })
  
  // 6. Test PDF Generation
  await testAPI('/api/reports/test123/pdf', 'GET')
  
  // 7. Test Email API
  await testAPI('/api/send-email', 'POST', {
    to: 'test@example.com',
    subject: 'E2E Test Email',
    html: '<h1>Test Email</h1>'
  })
  
  // 8. Test ML Analysis
  await testAPI('/api/ml-analysis', 'GET')
  
  console.log('\n🎯 E2E Test Summary Complete')
}

runE2ETests()