import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

let environment = process.env.NODE_ENV || 'staging';

dotenv.config({
  path: path.resolve(__dirname, `.env.${environment}`),
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
      testMatch: /.*\.setup\.ts/,
      use: { headless: true }
    },
    {
      name: 'smoke',
      testDir: './tests/smoke',
      testMatch: /.*\.spec\.ts|.*\.test\.ts/,
      //testIgnore: /.*\.setup\.ts/,
      use: { headless: true }
    },
    {
      name: 'api',
      testDir: './tests/api',
      testMatch: /.*\.spec\.ts|.*\.test\.ts/,
      testIgnore: /.*\.setup\.ts/,
      use: { headless: true, baseURL: process.env.BASE_URL_API }
    },
    {
      name: 'regression',
      testDir: './tests/regression',
      testMatch: /.*\.spec\.ts|.*\.test\.ts/,
      //dependencies: ['setup']
    },
    {
      name: 'sanity',
      testDir: './tests/sanity',
      testMatch: /.*\.spec\.ts|.*\.test\.ts/,
      dependencies: ['setup']
    },
  ],
});
