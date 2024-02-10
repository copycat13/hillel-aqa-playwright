const { defineConfig } = require('@playwright/test');

require('dotenv').config();

module.exports = defineConfig({
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [
      'monocart-reporter',
      {
        open: 'always',
        name: 'monocart',
        outputFile: './monocart-results/report.html',
      },
    ],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.USER_NAME,
      password: process.env.USER_PASSWORD,
    },
    trace: 'on',
    browserName: 'chromium',
  },
  expect: {
    timeout: 5000,
  },
  projects: [
    {
      name: 'homework18',
      testDir: '../e2e/',
      testMatch: 'fuelExpenses.spec.js',
      dependencies: ['login'],
    },
    {
      name: 'login',
      testDir: '../e2e',
      testMatch: 'loginStorage.spec.js',
    },
  ],
});
