import { Page, expect } from '@playwright/test';

export class QuestionnairePage {
  constructor(private page: Page) { }

  async verifyQuestionnaireStarted() {
    await expect(this.page).toHaveURL(/\/questionnaire/);
    await expect(this.page.getByText('Style Questionnaire')).toBeVisible();
  }

  async completeAllSteps() {
    // Complete 5 questionnaire steps
    for (let step = 1; step <= 5; step++) {
      await this.page.getByRole('radio').first().click();
      
      if (step < 5) {
        await this.page.getByRole('button', { name: 'Next' }).click();
        await this.page.waitForTimeout(500); // Brief wait for step transition
      }
    }
  }

  async submitQuestionnaire() {
    await this.page.getByRole('button', { name: 'Complete Analysis' }).click();
  }
}