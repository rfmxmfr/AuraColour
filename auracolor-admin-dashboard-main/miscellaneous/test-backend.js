const BASE_URL = 'http://localhost:3000'

async function testEndpoint(endpoint, method = 'GET', data = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    }
    
    if (data) {
      options.body = JSON.stringify(data)
    }
    
    const response = await fetch(`${ BASE_URL }${ endpoint }`, options)
    const result = await response.json()
    
    logger.info(`✅ ${ method } ${ endpoint }:`, response.status, result.success ? '✓' : result.error || 'OK')
    return { success: response.ok, data: result }
  } catch (error) {
    logger.info(`❌ ${ method } ${ endpoint }:`, error.message)
    return { success: false, error: error.message }
  }
}

async function runTests() {
  logger.info('🧪 Testing Backend Services...\n')
  
  const testData = {
    email: 'test@example.com',
    name: 'Test User',
    phone: '+1234567890',
  }
  
  // Test system health
  await testEndpoint('/api/test-all')
  
  // Test services listing
  await testEndpoint('/api/services')
  
  // Test color analysis
  await testEndpoint('/api/color-analysis', 'POST', {
    ...testData,
    imageUrl: 'https://via.placeholder.com/400x400',
  })
  
  // Test 12-season analysis
  await testEndpoint('/api/12-season-analysis', 'POST', {
    ...testData,
    imageUrl: 'https://via.placeholder.com/400x400',
    questionnaire: { style_preference: 'classic' },
  })
  
  // Test virtual wardrobe
  await testEndpoint('/api/virtual-wardrobe', 'POST', {
    ...testData,
    wardrobe_size: 'medium',
    style_goals: 'minimalist',
    budget: 500,
  })
  
  // Test personal shopping
  await testEndpoint('/api/personal-shopping', 'POST', {
    ...testData,
    budget: 150,
    shopping_goals: 'work wardrobe',
    preferred_brands: ['Zara', 'H&M'],
  })
  
  // Test style coaching
  await testEndpoint('/api/style-coaching', 'POST', {
    ...testData,
    current_style_challenges: 'lack confidence',
    style_goals: 'professional look',
    lifestyle: 'office worker',
  })
  
  // Test gift vouchers
  const voucherResult = await testEndpoint('/api/gift-vouchers', 'POST', {
    purchaser_email: 'buyer@example.com',
    purchaser_name: 'Gift Buyer',
    recipient_email: testData.email,
    recipient_name: testData.name,
    amount: 75,
    personal_message: 'Happy Birthday!',
  })
  
  // Test voucher redemption if voucher was created
  if (voucherResult.success && voucherResult.data.voucher_code) {
    await testEndpoint('/api/voucher-redeem', 'POST', {
      voucher_code: voucherResult.data.voucher_code,
      service_id: 'virtual_wardrobe',
      customer_email: testData.email,
    })
  }
  
  // Test questionnaire
  await testEndpoint('/api/questionnaire', 'POST', {
    user_id: 'test-user-123',
    answers: { q1: 'answer1', q2: 'answer2' },
    photoUrls: ['https://via.placeholder.com/400x400'],
  })
  
  // Test bookings
  await testEndpoint('/api/bookings', 'POST', {
    ...testData,
    service_type: 'color_analysis',
    preferred_date: '2024-12-01',
    preferred_time: '14:00',
  })
  
  logger.info('\n🏁 Backend Test Complete')
}

// Run tests
runTests().catch(console.error)