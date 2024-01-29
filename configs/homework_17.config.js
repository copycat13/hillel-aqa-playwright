const { defineConfig } = require('@playwright/test');

require('dotenv').config();

module.exports = defineConfig({
  testDir: '../e2e/',
  testMatch: 'registration.spec.js',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
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
});
