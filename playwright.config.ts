import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Refactor for for other environments
dotenv.config({
  path: path.resolve(__dirname, `.env.local`),
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
        ...devices['Desktop Chrome'],
      },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'myTests',
      testMatch: /.*\.spec\.ts|.*\.test\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/adminUser.json'
      },
      dependencies: ['setup']
    },
  ],
});
