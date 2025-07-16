// Simple test without TypeScript dependencies
async function testBasicEndpoints() {
  console.log('🧪 Testing Basic Backend Logic...\n')
  
  // Test if server is running
  try {
    const response = await fetch('http://localhost:3000/api/test-all')
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Server is running')
      console.log('📊 System Health:', data.successRate)
      console.log('🔧 Working:', Object.entries(data.results).filter(([k,v]) => v && k !== 'timestamp').map(([k]) => k).join(', '))
    } else {
      console.log('❌ Server responded with error:', response.status)
    }
  } catch (error) {
    console.log('❌ Server not running or unreachable')
    console.log('💡 Start server with: npm run dev')
    return
  }
  
  // Test services endpoint
  try {
    const response = await fetch('http://localhost:3000/api/services')
    const data = await response.json()
    console.log('✅ Services endpoint working')
    console.log('📋 Available services:', data.total_services)
    data.services.forEach(service => {
      console.log(`  - ${service.name}: £${service.price}`)
    })
  } catch (error) {
    console.log('❌ Services endpoint failed')
  }
  
  // Test color analysis with mock data
  try {
    const response = await fetch('http://localhost:3000/api/color-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrl: 'https://via.placeholder.com/400x400/FFB6C1/000000?text=Test+Face',
        email: 'test@example.com',
        name: 'Test User'
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Color analysis working')
      console.log('🎨 Result:', data.season, `(${data.confidence}% confidence)`)
      console.log('🎫 Ticket:', data.ticket_number)
    } else {
      console.log('❌ Color analysis failed:', response.status)
    }
  } catch (error) {
    console.log('❌ Color analysis error:', error.message)
  }
  
  console.log('\n🏁 Basic Test Complete')
}

testBasicEndpoints().catch(console.error)