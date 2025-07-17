// Simple test without TypeScript dependencies
async function testBasicEndpoints() {
  logger.info('🧪 Testing Basic Backend Logic...\n')
  
  // Test if server is running
  try {
    const response = await fetch('http://localhost:3000/api/test-all')
    if (response.ok) {
      const data = await response.json()
      logger.info('✅ Server is running')
      logger.info('📊 System Health:', data.successRate)
      logger.info('🔧 Working:', Object.entries(data.results).filter(([k,v]) => v && k !== 'timestamp').map(([k]) => k).join(', '))
    } else {
      logger.info('❌ Server responded with error:', response.status)
    }
  } catch (error) {
    logger.info('❌ Server not running or unreachable')
    logger.info('💡 Start server with: npm run dev')
    return
  }
  
  // Test services endpoint
  try {
    const response = await fetch('http://localhost:3000/api/services')
    const data = await response.json()
    logger.info('✅ Services endpoint working')
    logger.info('📋 Available services:', data.total_services)
    data.services.forEach(service => {
      logger.info(`  - ${ service.name }: £${ service.price }`)
    })
  } catch (error) {
    logger.info('❌ Services endpoint failed')
  }
  
  // Test color analysis with mock data
  try {
    const response = await fetch('http://localhost:3000/api/color-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrl: 'https://via.placeholder.com/400x400/FFB6C1/000000?text=Test+Face',
        email: 'test@example.com',
        name: 'Test User',
      }),
    })
    
    if (response.ok) {
      const data = await response.json()
      logger.info('✅ Color analysis working')
      logger.info('🎨 Result:', data.season, `(${ data.confidence }% confidence)`)
      logger.info('🎫 Ticket:', data.ticket_number)
    } else {
      logger.info('❌ Color analysis failed:', response.status)
    }
  } catch (error) {
    logger.info('❌ Color analysis error:', error.message)
  }
  
  logger.info('\n🏁 Basic Test Complete')
}

testBasicEndpoints().catch(console.error)