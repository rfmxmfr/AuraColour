const { test, expect } = require('@playwright/test');

/**
 * AuraColor Customer Journey Test
 * Simulates the complete user flow from product selection to results
 */
test('Complete customer journey from purchase to results', async ({ page }) => {
  // Step 1: Product Selection
  await page.goto('/services');
  await expect(page.getByText('12-Season Color Analysis')).toBeVisible();
  await page.getByRole('link', { name: 'Take the Quiz' }).first().click();
  
  // Step 2: Photo Upload
  await expect(page).toHaveURL(/\/questionnaire/);
  await expect(page.getByText('Upload Your Photo')).toBeVisible();
  
  // Simulate file upload
  await page.setInputFiles('input[type="file"]', './tests/fixtures/test-portrait.jpg');
  await expect(page.getByText('Image Preview')).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();
  
  // Step 3: Payment Process
  await expect(page.getByText('Complete Your Purchase')).toBeVisible();
  
  // Fill Stripe payment form in test mode
  const stripeFrame = page.frameLocator('iframe[name^="__privateStripeFrame"]');
  await stripeFrame.locator('[placeholder="Card number"]').fill('4242424242424242');
  await stripeFrame.locator('[placeholder="MM / YY"]').fill('12/25');
  await stripeFrame.locator('[placeholder="CVC"]').fill('123');
  await stripeFrame.locator('[placeholder="ZIP"]').fill('12345');
  
  await page.getByRole('button', { name: 'Pay £75.00' }).click();
  
  // Step 4: Processing
  await expect(page.getByText('Analyzing Your Colors')).toBeVisible();
  await expect(page.getByRole('progressbar')).toBeVisible();
  
  // Wait for analysis to complete (with timeout)
  await expect(page.getByText('Your Analysis is Ready!')).toBeVisible({ timeout: 30000 });
  
  // Step 5: Results
  await expect(page.getByText('Your Color Season')).toBeVisible();
  await expect(page.getByText('Confidence Score:')).toBeVisible();
  
  // Verify result components
  await expect(page.getByText('Recommended Colors')).toBeVisible();
  await expect(page.getByText('Color Palette')).toBeVisible();
  
  // Test download functionality
  await page.getByRole('button', { name: 'Download PDF' }).click();
  await expect(page.getByText('Download Started')).toBeVisible();
  
  // Test sharing functionality
  await page.getByRole('button', { name: 'Share Results' }).click();
  await page.getByPlaceholder('Email address').fill('test@example.com');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('Results Shared Successfully')).toBeVisible();
});

/**
 * Test error handling during the journey
 */
test('Error handling during customer journey', async ({ page }) => {
  // Test invalid image upload
  await page.goto('/questionnaire');
  await page.setInputFiles('input[type="file"]', './tests/fixtures/invalid-file.txt');
  await expect(page.getByText('Invalid file format')).toBeVisible();
  
  // Test payment failure
  await page.goto('/questionnaire?step=payment');
  const stripeFrame = page.frameLocator('iframe[name^="__privateStripeFrame"]');
  await stripeFrame.locator('[placeholder="Card number"]').fill('4000000000000002'); // Declined card
  await stripeFrame.locator('[placeholder="MM / YY"]').fill('12/25');
  await stripeFrame.locator('[placeholder="CVC"]').fill('123');
  await stripeFrame.locator('[placeholder="ZIP"]').fill('12345');
  
  await page.getByRole('button', { name: 'Pay £75.00' }).click();
  await expect(page.getByText('Your card was declined')).toBeVisible();
});