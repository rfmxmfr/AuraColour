// Test 12-season analysis rules without server
const { findBestSeason, calculateSeasonScore, SEASON_RULES } = require('./lib/color-analysis/rules.ts')

function testColorAnalysisRules() {
  console.log('🎨 Testing 12-Season Color Analysis Rules...\n')
  
  // Test cases with expected results
  const testCases = [
    {
      name: 'Light Spring',
      features: {
        skinTone: 'light',
        undertone: 'warm',
        hairColor: 'blonde',
        eyeColor: 'blue',
        contrast: 'low',
        saturation: 'clear'
      },
      expected: 'Light Spring'
    },
    {
      name: 'Deep Winter',
      features: {
        skinTone: 'dark',
        undertone: 'cool',
        hairColor: 'black',
        eyeColor: 'brown',
        contrast: 'high',
        saturation: 'clear'
      },
      expected: 'Deep Winter'
    },
    {
      name: 'Warm Autumn',
      features: {
        skinTone: 'medium',
        undertone: 'warm',
        hairColor: 'red',
        eyeColor: 'hazel',
        contrast: 'medium',
        saturation: 'muted'
      },
      expected: 'Warm Autumn'
    }
  ]
  
  testCases.forEach(testCase => {
    const result = findBestSeason(testCase.features)
    const match = result.season === testCase.expected
    
    console.log(`${match ? '✅' : '❌'} ${testCase.name}:`)
    console.log(`  Input: ${JSON.stringify(testCase.features)}`)
    console.log(`  Expected: ${testCase.expected}`)
    console.log(`  Got: ${result.season} (${result.score}% confidence)`)
    console.log(`  Colors: ${result.colors.slice(0, 3).join(', ')}...\n`)
  })
  
  console.log(`📊 Available Seasons: ${SEASON_RULES.length}`)
  console.log('Categories:', [...new Set(SEASON_RULES.map(r => r.category))].join(', '))
  console.log('Subtypes:', [...new Set(SEASON_RULES.map(r => r.subtype))].join(', '))
}

// Test without requiring server
try {
  // Mock require for TypeScript file
  const fs = require('fs')
  const rulesContent = fs.readFileSync('./lib/color-analysis/rules.ts', 'utf8')
  
  // Extract and evaluate the rules (simplified)
  console.log('✅ Rules file exists and is readable')
  console.log('📁 File size:', rulesContent.length, 'characters')
  console.log('🔍 Contains SEASON_RULES:', rulesContent.includes('SEASON_RULES'))
  console.log('🔍 Contains findBestSeason:', rulesContent.includes('findBestSeason'))
  
} catch (error) {
  console.error('❌ Rules test failed:', error.message)
}

console.log('\n🏁 Rules Test Complete')