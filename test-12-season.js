const { ColorFeatures, findBestSeason, calculateSeasonScore, SEASON_RULES } = require('./lib/color-analysis/rules.ts')

// Test the 12-season analysis rules
function test12SeasonRules() {
  console.log('🧪 Testing 12-Season Analysis Rules...\n')

  // Test case 1: Light Spring features
  const lightSpringFeatures = {
    skinTone: 'light',
    undertone: 'warm',
    hairColor: 'blonde',
    eyeColor: 'blue',
    contrast: 'low',
    saturation: 'clear'
  }

  const result1 = findBestSeason(lightSpringFeatures)
  console.log('Test 1 - Light Spring Features:')
  console.log('Input:', lightSpringFeatures)
  console.log('Result:', result1)
  console.log('Expected: Light Spring or similar warm/light season\n')

  // Test case 2: Deep Winter features
  const deepWinterFeatures = {
    skinTone: 'dark',
    undertone: 'cool',
    hairColor: 'black',
    eyeColor: 'brown',
    contrast: 'high',
    saturation: 'clear'
  }

  const result2 = findBestSeason(deepWinterFeatures)
  console.log('Test 2 - Deep Winter Features:')
  console.log('Input:', deepWinterFeatures)
  console.log('Result:', result2)
  console.log('Expected: Deep Winter or similar cool/dark season\n')

  // Test case 3: Soft Autumn features
  const softAutumnFeatures = {
    skinTone: 'medium',
    undertone: 'warm',
    hairColor: 'brown',
    eyeColor: 'hazel',
    contrast: 'low',
    saturation: 'soft'
  }

  const result3 = findBestSeason(softAutumnFeatures)
  console.log('Test 3 - Soft Autumn Features:')
  console.log('Input:', softAutumnFeatures)
  console.log('Result:', result3)
  console.log('Expected: Soft Autumn or similar warm/muted season\n')

  // Show all available seasons
  console.log('📋 Available Seasons:')
  SEASON_RULES.forEach((rule, index) => {
    console.log(`${index + 1}. ${rule.season} (${rule.category} - ${rule.subtype})`)
  })

  console.log('\n✅ 12-Season Rules Test Complete')
}

// Run the test
try {
  test12SeasonRules()
} catch (error) {
  console.error('❌ Test failed:', error.message)
}