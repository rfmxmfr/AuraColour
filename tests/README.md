# AuraColor Automated Testing

This directory contains automated tests for the AuraColor application using Playwright.

## Customer Journey Tests

The `customer-journey.test.js` file simulates the complete user flow from product selection to receiving color analysis results.

### Test Scenarios

1. **Complete Customer Journey**
   - Product selection
   - Photo upload
   - Payment processing
   - Analysis waiting
   - Results viewing and sharing

2. **Error Handling**
   - Invalid file upload
   - Payment failure

## Running Tests

```bash
# Install dependencies
npm install

# Run tests headlessly
npm test

# Run tests with UI
npm run test:ui
```

## Test Fixtures

- `test-portrait.jpg` - Sample image for testing photo upload
- `invalid-file.txt` - Invalid file for testing error handling

## Configuration

Tests are configured in `playwright.config.js` to run on both desktop and mobile viewports.

## CI/CD Integration

These tests can be integrated into your CI/CD pipeline by running:

```bash
npm test
```

## Adding New Tests

To add new test scenarios:

1. Create a new test file in the `tests` directory
2. Add any required fixtures to the `tests/fixtures` directory
3. Run the tests to verify functionality