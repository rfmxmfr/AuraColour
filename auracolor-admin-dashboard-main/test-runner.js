#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  describe(name, fn) {
    console.log(`\n📋 ${name}`);
    fn();
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  expect(actual) {
    return {
      toBe: (expected) => {
        if (actual !== expected) {
          throw new Error(`Expected ${expected}, got ${actual}`);
        }
      },
      toEqual: (expected) => {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        }
      },
      toBeTruthy: () => {
        if (!actual) {
          throw new Error(`Expected truthy value, got ${actual}`);
        }
      },
      toBeFalsy: () => {
        if (actual) {
          throw new Error(`Expected falsy value, got ${actual}`);
        }
      }
    };
  }

  async run() {
    console.log('🚀 Running tests...\n');
    
    for (const test of this.tests) {
      try {
        await test.fn();
        console.log(`✅ ${test.name}`);
        this.passed++;
      } catch (error) {
        console.log(`❌ ${test.name}`);
        console.log(`   ${error.message}`);
        this.failed++;
      }
    }

    console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
    return this.failed === 0;
  }
}

// Global test functions
const runner = new TestRunner();
global.describe = runner.describe.bind(runner);
global.test = runner.test.bind(runner);
global.expect = runner.expect.bind(runner);

// Auto-run if called directly
if (require.main === module) {
  const testFile = process.argv[2];
  if (testFile) {
    require(path.resolve(testFile));
    runner.run().then(success => process.exit(success ? 0 : 1));
  } else {
    console.log('Usage: node test-runner.js <test-file>');
  }
}

module.exports = { TestRunner };