const fs = require('fs')
const path = require('path')
const { FormData } = require('formdata-node')
const { Blob } = require('fetch-blob')

async function testColorAnalysis() {
  try {
    // Create a test image file (placeholder)
    const testImagePath = path.join(__dirname, 'public', 'placeholder-user.jpg')
    
    if (!fs.existsSync(testImagePath)) {
      console.log('Test image not found, skipping test')
      return
    }

    const formData = new FormData()
    const imageBuffer = fs.readFileSync(testImagePath)
    const blob = new Blob([imageBuffer], { type: 'image/jpeg' })
    formData.append('image', blob, 'test.jpg')

    const response = await fetch('http://localhost:3000/api/color-analysis', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()
    console.log('Color Analysis Result:', result)
    
    if (result.season) {
      console.log('✅ AI Color Analysis working correctly')
    } else {
      console.log('❌ AI Color Analysis failed')
    }
  } catch (error) {
    console.error('Test failed:', error.message)
  }
}

// Run test if server is running
testColorAnalysis()