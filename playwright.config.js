// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: '../e2e/',
    testMatch: '*.spec.js',
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        [
            'monocart-reporter',
            {
                name: 'monocart',
                outputFile: './monocart-results/report.html',
            },
        ],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        baseURL: 'https://qauto.forstudy.space/',
        httpCredentials: {
            username: 'guest',
            password: 'welcome2qauto',
        },
        trace: 'on',
        browserName: 'chromium',
    },
    expect: {
        // Maximum time expect() should wait for the condition to be met.
        timeout: 5000,
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'homework15',
            testDir: './e2e/',
            testMatch: 'registration.spec.js',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'homework18',
            testDir: './e2e/',
            testMatch: 'fuelExpenses.spec.js',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'homework19',
            testDir: './e2e/',
            testMatch: 'profileNetwork.spec.js',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'login',
            testDir: '../e2e',
            testMatch: 'loginStorage.spec.js',
            use: { ...devices['Desktop Chrome'] },
        },

        { name: 'api', testDir: './setup', testMatch: 'api.setup.js' },

        {
            name: 'homework22',
            testDir: './e2e',
            testMatch: 'createCars.spec.js',
            use: {
                extraHTTPHeaders: { Cookie: process.env.AUTH_SID || '' },
                ...devices['Desktop Chrome'],
                // baseURL: process.env.API_URL || '',
            },
            dependencies: ['api'],
        },

        // {
        //   name: "firefox",
        //   use: { ...devices["Desktop Firefox"] },
        // },

        // {
        //   name: "webkit",
        //   use: { ...devices["Desktop Safari"] },
        // },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
