#!/usr/bin/env node

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';
const TEST_IMAGE = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400';

async function runE2ETest() {
  console.log('🧪 AuraColour End-to-End Test');
  console.log('==============================\n');

  const tests = [
    { name: 'Health Check', test: testHealthCheck },
    { name: 'Contact Form', test: testContactForm },
    { name: 'Questionnaire', test: testQuestionnaire },
    { name: 'AI Analysis', test: testAIAnalysis },
    { name: 'Payment Creation', test: testPaymentCreation }
  ];

  let passed = 0;
  let failed = 0;

  for (const { name, test } of tests) {
    try {
      console.log(`🔍 Testing: ${name}`);
      await test();
      console.log(`✅ ${name} - PASSED\n`);
      passed++;
    } catch (error) {
      console.log(`❌ ${name} - FAILED: ${error.message}\n`);
      failed++;
    }
  }

  console.log('📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
}

async function testHealthCheck() {
  const response = await fetch(`${BASE_URL}/api/test`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data.success) throw new Error('Health check failed');
}

async function testContactForm() {
  const response = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      message: 'E2E test message'
    })
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data.success) throw new Error('Contact form submission failed');
}

async function testQuestionnaire() {
  const response = await fetch(`${BASE_URL}/api/questionnaire`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Customer',
      email: 'customer@example.com',
      data: {
        skinTone: 'fair',
        eyeColor: 'blue',
        hairColor: 'blonde'
      }
    })
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data.success) throw new Error('Questionnaire submission failed');
}

async function testAIAnalysis() {
  const response = await fetch(`${BASE_URL}/api/ai-compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      imageUrl: TEST_IMAGE
    })
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data.comparison) throw new Error('AI analysis failed');
}

async function testPaymentCreation() {
  const response = await fetch(`${BASE_URL}/api/create-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: 7500,
      currency: 'gbp',
      description: 'E2E Test Payment'
    })
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data.clientSecret) throw new Error('Payment creation failed');
}

// Run the test
runE2ETest().catch(console.error);