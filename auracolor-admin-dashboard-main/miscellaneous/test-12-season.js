const { ColorFeatures, findBestSeason, calculateSeasonScore, SEASON_RULES } = require('./lib/color-analysis/rules.ts')

// Test the 12-season analysis rules
function test12SeasonRules() {
  logger.info('🧪 Testing 12-Season Analysis Rules...\n')

  // Test case 1: Light Spring features
  const lightSpringFeatures = {
    skinTone: 'light',
    undertone: 'warm',
    hairColor: 'blonde',
    eyeColor: 'blue',
    contrast: 'low',
    saturation: 'clear',
  }

  const result1 = findBestSeason(lightSpringFeatures)
  logger.info('Test 1 - Light Spring Features:')
  logger.info('Input:', lightSpringFeatures)
  logger.info('Result:', result1)
  logger.info('Expected: Light Spring or similar warm/light season\n')

  // Test case 2: Deep Winter features
  const deepWinterFeatures = {
    skinTone: 'dark',
    undertone: 'cool',
    hairColor: 'black',
    eyeColor: 'brown',
    contrast: 'high',
    saturation: 'clear',
  }

  const result2 = findBestSeason(deepWinterFeatures)
  logger.info('Test 2 - Deep Winter Features:')
  logger.info('Input:', deepWinterFeatures)
  logger.info('Result:', result2)
  logger.info('Expected: Deep Winter or similar cool/dark season\n')

  // Test case 3: Soft Autumn features
  const softAutumnFeatures = {
    skinTone: 'medium',
    undertone: 'warm',
    hairColor: 'brown',
    eyeColor: 'hazel',
    contrast: 'low',
    saturation: 'soft',
  }

  const result3 = findBestSeason(softAutumnFeatures)
  logger.info('Test 3 - Soft Autumn Features:')
  logger.info('Input:', softAutumnFeatures)
  logger.info('Result:', result3)
  logger.info('Expected: Soft Autumn or similar warm/muted season\n')

  // Show all available seasons
  logger.info('📋 Available Seasons:')
  SEASON_RULES.forEach((rule, index) => {
    logger.info(`${ index + 1 }. ${ rule.season } (${ rule.category } - ${ rule.subtype })`)
  })

  logger.info('\n✅ 12-Season Rules Test Complete')
}

// Run the test
try {
  test12SeasonRules()
} catch (error) {
  logger.error('❌ Test failed:', error.message)
}