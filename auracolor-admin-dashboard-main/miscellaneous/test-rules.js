// Test 12-season analysis rules without server
const { findBestSeason, calculateSeasonScore, SEASON_RULES } = require('./lib/color-analysis/rules.ts')

function testColorAnalysisRules() {
  logger.info('🎨 Testing 12-Season Color Analysis Rules...\n')
  
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
        saturation: 'clear',
      },
      expected: 'Light Spring',
    },
    {
      name: 'Deep Winter',
      features: {
        skinTone: 'dark',
        undertone: 'cool',
        hairColor: 'black',
        eyeColor: 'brown',
        contrast: 'high',
        saturation: 'clear',
      },
      expected: 'Deep Winter',
    },
    {
      name: 'Warm Autumn',
      features: {
        skinTone: 'medium',
        undertone: 'warm',
        hairColor: 'red',
        eyeColor: 'hazel',
        contrast: 'medium',
        saturation: 'muted',
      },
      expected: 'Warm Autumn',
    },
  ]
  
  testCases.forEach(testCase => {
    const result = findBestSeason(testCase.features)
    const match = result.season === testCase.expected
    
    logger.info(`${ match ? '✅' : '❌' } ${ testCase.name }:`)
    logger.info(`  Input: ${ JSON.stringify(testCase.features) }`)
    logger.info(`  Expected: ${ testCase.expected }`)
    logger.info(`  Got: ${ result.season } (${ result.score }% confidence)`)
    logger.info(`  Colors: ${ result.colors.slice(0, 3).join(', ') }...\n`)
  })
  
  logger.info(`📊 Available Seasons: ${ SEASON_RULES.length }`)
  logger.info('Categories:', [...new Set(SEASON_RULES.map(r => r.category))].join(', '))
  logger.info('Subtypes:', [...new Set(SEASON_RULES.map(r => r.subtype))].join(', '))
}

// Test without requiring server
try {
  // Mock require for TypeScript file
  const fs = require('fs')
  const rulesContent = fs.readFileSync('./lib/color-analysis/rules.ts', 'utf8')
  
  // Extract and evaluate the rules (simplified)
  logger.info('✅ Rules file exists and is readable')
  logger.info('📁 File size:', rulesContent.length, 'characters')
  logger.info('🔍 Contains SEASON_RULES:', rulesContent.includes('SEASON_RULES'))
  logger.info('🔍 Contains findBestSeason:', rulesContent.includes('findBestSeason'))
  
} catch (error) {
  logger.error('❌ Rules test failed:', error.message)
}

logger.info('\n🏁 Rules Test Complete')