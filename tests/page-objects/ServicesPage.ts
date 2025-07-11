import { Page, expect } from '@playwright/test';

export class ServicesPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/services');
  }

  async verifyServiceVisible() {
    await expect(this.page.getByText('12-Season Color Analysis')).toBeVisible();
  }

  async startQuiz() {
    await this.page.getByRole('link', { name: 'Take the Quiz' }).first().click();
  }
}