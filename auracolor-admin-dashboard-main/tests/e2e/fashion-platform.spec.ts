import { test, expect } from '@playwright/test';

test('fashion platform e2e flow', async ({ page }) => {
  // Navigate to homepage
  await page.goto('/');
  
  // Test color analysis flow
  await page.click('text=Color Analysis');
  await page.setInputFiles('input[type="file"]', 'tests/fixtures/test-photo.jpg');
  await page.click('text=Analyze');
  await expect(page.locator('text=Your Season')).toBeVisible();
  
  // Test personal shopper
  await page.click('text=Personal Shopper');
  await page.click('text=Add to Cart');
  await expect(page.locator('text=Cart (1)')).toBeVisible();
  
  // Test checkout flow
  await page.click('text=Checkout');
  await page.fill('[data-testid="email"]', 'test@example.com');
  await page.fill('[data-testid="card-number"]', '4242424242424242');
  await page.fill('[data-testid="card-expiry"]', '12/25');
  await page.fill('[data-testid="card-cvc"]', '123');
  await page.click('text=Pay Now');
  await expect(page.locator('text=Payment Successful')).toBeVisible();
  
  // Test stylist booking
  await page.click('text=Book Stylist');
  await page.click('[data-testid="date-picker"]');
  await page.click('text=15'); // Select date
  await page.click('text=10:00 AM'); // Select time
  await page.click('text=Book Appointment');
  await expect(page.locator('text=Appointment Confirmed')).toBeVisible();
});