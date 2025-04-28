import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
require('dotenv').config();

// Refactor for for other environments
dotenv.config({
  path: path.resolve(__dirname, `.env.staging`),
  override: true
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      use: {
        //...devices['Desktop Chrome'],
        headless: true
      },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'myTests',
      testMatch: /.*\.spec\.ts|.*\.test\.ts/,
      use: {
        //...devices['Desktop Chrome'],
        headless: true,
        //storageState: '.auth/adminUser.json'
      },
      dependencies: ['setup']
    },
  ],
});
