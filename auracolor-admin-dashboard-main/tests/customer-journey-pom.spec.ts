import { test, expect } from '@playwright/test';
import { ServicesPage } from './page-objects/ServicesPage';
import { QuestionnairePage } from './page-objects/QuestionnairePage';
import { PaymentPage } from './page-objects/PaymentPage';
import { ResultsPage } from './page-objects/ResultsPage';

/**
 * Complete Customer Journey Test using Page Object Model
 * Tests the full flow from service selection to receiving results
 */
test('Complete customer journey with Page Object Model', async ({ page }) => {
  // Initialize page objects
  const servicesPage = new ServicesPage(page);
  const questionnairePage = new QuestionnairePage(page);
  const paymentPage = new PaymentPage(page);
  const resultsPage = new ResultsPage(page);

  // Step 1: Navigate to services and start quiz
  await servicesPage.goto();
  await servicesPage.verifyServiceVisible();
  await servicesPage.startQuiz();

  // Step 2: Complete questionnaire
  await questionnairePage.verifyQuestionnaireStarted();
  await questionnairePage.completeAllSteps();
  await questionnairePage.submitQuestionnaire();

  // Step 3: Complete payment
  await paymentPage.verifyPaymentPage();
  await paymentPage.fillPaymentDetails();
  await paymentPage.completePayment();

  // Step 4: Verify results page
  await resultsPage.verifyResultsPage();
  await resultsPage.verifyColorSeason();
  await resultsPage.verifyConfidenceScore();
  await resultsPage.verifyColorPalette();
  await resultsPage.verifyActionButtons();
});

/**
 * Test individual result page features
 */
test('Results page functionality', async ({ page }) => {
  const resultsPage = new ResultsPage(page);
  
  // Navigate directly to results (assuming test data exists)
  await page.goto('/results/test-analysis-id');
  
  await resultsPage.verifyResultsPage();
  
  // Test PDF download
  await resultsPage.downloadPDF();
  
  // Test email sharing
  await resultsPage.shareResults();
});

/**
 * Test questionnaire completion with different selections
 */
test('Questionnaire with varied selections', async ({ page }) => {
  const servicesPage = new ServicesPage(page);
  const questionnairePage = new QuestionnairePage(page);
  
  await servicesPage.goto();
  await servicesPage.startQuiz();
  
  await questionnairePage.verifyQuestionnaireStarted();
  
  // Custom questionnaire completion with specific selections
  for (let step = 1; step <= 5; step++) {
    // Select different options for variety
    const radioIndex = step % 3; // Cycle through first 3 options
    await page.getByRole('radio').nth(radioIndex).click();
    
    if (step < 5) {
      await page.getByRole('button', { name: 'Next' }).click();
      await page.waitForTimeout(500);
    }
  }
  
  await questionnairePage.submitQuestionnaire();
});