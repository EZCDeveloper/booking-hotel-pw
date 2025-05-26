---
trigger: manual
---

# ✨ Page Object Model & Fixtures Guideline ✨

Build Page Object Model and Fixtures for Playwright

## 1. Page Object Model (POM) with TypeScript

- **Location:** Generally in `src/support/pages/` (mdc:src/support/pages/).
- **Class Structure:**
    
    ```tsx
    import { type Page, type Locator } from '@playwright/test';
    
    export class LoginPage {
        readonly page: Page; // Or the Locator of a parent component
        readonly usernameInput: Locator;
        readonly passwordInput: Locator;
        readonly loginButton: Locator;
        readonly errorMessage: Locator;
    
        constructor(page: Page) {
            this.page = page;
            this.usernameInput = page.getByLabel('Username'); // Example
            this.passwordInput = page.getByLabel('Password'); // Example
            this.loginButton = page.getByRole('button', { name: /Sign In/i });
            this.errorMessage = page.getByTestId('login-error-message');
        }
    
        async navigateTo(): Promise<void> {
            await this.page.goto('/login');
        }
    
        async typeUsername(username: string): Promise<void> {
            await this.usernameInput.fill(username);
        }
    
        async typePassword(password: string): Promise<void> {
            await this.passwordInput.fill(password);
        }
    
        async clickLoginButton(): Promise<void> {
            await this.loginButton.click();
        }
    
        async login(username: string, password: string): Promise<void> {
            await this.typeUsername(username);
            await this.typePassword(password);
            await this.clickLoginButton();
        }
    
    }
    
    ```
    
- **Strong Typing:** Use Playwright types (`Page`, `Locator`, `APIRequestContext`) and custom types for data.
- **Asynchronous Methods:** All methods interacting with the page must be `async` and use `await`.
- **Method Returns:** Action methods generally return `Promise<void>`. If an action navigates to a new page, they can return an instance of the new page's POM: `async submit(): Promise<DashboardPage> { /* ... */ return new DashboardPage(this.page); }`.
- **DO NOT** include (expected) assertions within POM classes. Assertions belong in test files (.spec.ts)

## 2. Playwright Fixtures (`test.extend`)

- **Location:** `src/fixtures/` (mdc:src/fixtures/) or similar.
- **Purpose:** Encapsulate setup/teardown logic, provide instances of POMs, API clients, or pre-configured data.
- **Fixture Example:**
    
    ```tsx
    // src/fixtures/myFixtures/allFixtures.ts
    import { test as baseTest, request } from "@playwright/test";
    import { BasePage } from "../../support/pages/base.page";
    import { LoginPage } from "../../support/pages/authentication/login.page";
    
    type PageFixtures = {
        basePage: BasePage;
        loginPage: LoginPage;
    }
    
    export type ApiFixtures = {
        userApiHelper: UserApiHelper;
    }
    
    export const test = baseTest.extend<PageFixtures & ApiFixtures>({
        /*-- Pages --*/
        basePage: async ({ page }, use) => {
            const basePage = new BasePage(page);
            await use(basePage);
        },
        loginPage: async ({ page }, use) => {
            const loginPage = new LoginPage(page);
            await use(loginPage);
        }
      
        /*-- API --*/
        userApiHelper: async ({ page }, use) => {
            const apiContext = await request.newContext({ baseURL: process.env.BASE_URL_API });
            await use(new UserApiHelper(apiContext));
            await apiContext.dispose();
        }
    });;
    
    export { expect } from '@playwright/test';
    ```
    
- **Usage in Tests:** Import the extended `test` instead of the one from `@playwright/test`.
    
    ```tsx
    // tests/mytest.test.ts
    import { test, expect } from '../../fixtures/myFixtures/allFixtures'
    import { UserRoles, Users } from '../../support/auth/user-roles';
    import { expect } from '@playwright/test';
    import { HotelTestData } from '../../fixtures/data/test-data';
    import { TEST_COPY } from '../../fixtures/data/test-copy';
    import { URL } from '../../fixtures/data/url-copy';
    
    test.describe('TS01_Create Hotel', () => {
    
        test.use({ storageState: Users[UserRoles.ADMIN].authFile });
    
        test('TC-001: Should Create a Hotel: [children: 60]',
            async ({ basePage, createHotelPage }) => {
                // 1. Login and navigate to home page
                await basePage.navigateTo('/');
    
                // 2-5. Create hotel using Page Object Model
                await createHotelPage.createHotel(HotelTestData.validHotel);
            })
    })
    ```