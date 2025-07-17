import { Page, expect } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) { }

  async verifyPaymentPage() {
    await expect(this.page.getByText('Complete Your Purchase')).toBeVisible();
  }

  async fillPaymentDetails() {
    // Mock Stripe payment form - using test card
    const stripeFrame = this.page.frameLocator('iframe[name^="__privateStripeFrame"]');
    
    await stripeFrame.locator('[placeholder="Card number"]').fill('4242424242424242');
    await stripeFrame.locator('[placeholder="MM / YY"]').fill('12/25');
    await stripeFrame.locator('[placeholder="CVC"]').fill('123');
    await stripeFrame.locator('[placeholder="ZIP"]').fill('12345');
  }

  async completePayment() {
    await this.page.getByRole('button', { name: 'Pay £75.00' }).click();
    
    // Wait for payment processing
    await expect(this.page.getByText('Processing Payment')).toBeVisible();
    await expect(this.page.getByText('Payment Successful')).toBeVisible({ timeout: 10000 });
  }
}