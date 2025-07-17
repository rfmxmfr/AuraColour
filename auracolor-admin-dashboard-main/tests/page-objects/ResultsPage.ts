import { Page, expect } from '@playwright/test';

export class ResultsPage {
  constructor(private page: Page) { }

  async verifyResultsPage() {
    await expect(this.page).toHaveURL(/\/results/);
    await expect(this.page.getByText('Your Analysis is Complete')).toBeVisible();
  }

  async verifyColorSeason() {
    await expect(this.page.getByText('Your Color Season')).toBeVisible();
    // Verify one of the 12 seasons is displayed
    const seasonPattern = /(Spring|Summer|Autumn|Winter)/;
    await expect(this.page.locator('text=' + seasonPattern.source)).toBeVisible();
  }

  async verifyConfidenceScore() {
    await expect(this.page.getByText('Confidence Score')).toBeVisible();
    // Verify percentage is shown
    await expect(this.page.locator('text=/\\d+%/')).toBeVisible();
  }

  async verifyColorPalette() {
    await expect(this.page.getByText('Recommended Colors')).toBeVisible();
    // Verify color swatches are present
    await expect(this.page.locator('[data-testid="color-palette"]')).toBeVisible();
  }

  async verifyActionButtons() {
    await expect(this.page.getByRole('button', { name: 'Download PDF' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Share Results' })).toBeVisible();
  }

  async downloadPDF() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('button', { name: 'Download PDF' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.pdf');
  }

  async shareResults() {
    await this.page.getByRole('button', { name: 'Share Results' }).click();
    await expect(this.page.getByPlaceholder('Email address')).toBeVisible();
    
    await this.page.getByPlaceholder('Email address').fill('test@example.com');
    await this.page.getByRole('button', { name: 'Send' }).click();
    
    await expect(this.page.getByText('Results shared successfully')).toBeVisible();
  }
}