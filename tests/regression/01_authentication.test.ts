import { test } from '../../fixtures/myFixtures/allFixtures';
import { UserRoles, Users } from '../../support/auth/user-roles';
import { expect } from '@playwright/test';

test.describe('1.1 User Registration (UI)', () => {
    test.beforeEach(async ({ }) => {
    })

    test('TC-1.1.01. Successful User Registration (UI Flow)',
        async ({ page }) => {
        });

    test('TC-1.1.02. User Registration with Existing Email (UI Feedback)',
        async ({ page }) => {
        });

    test('TC-1.1.03. User Registration with Invalid Input (UI Validations)',
        async ({ page }) => {
        });
})

test.describe('1.2 User Login (UI)', () => {
    test.use({ storageState: Users[UserRoles.ADMIN].authFile });

    test('TC-1.2.01. Successful User Login (UI Flow)',
        async ({ page, basePage }) => {
            // 1. Navigate to home page
            await basePage.navigateTo('/');

            // 2. Verify My Hotel nav is visible
            const myHotelsNav = page.getByRole('link', { name: 'My Hotels' })
            await expect(myHotelsNav).toBeVisible()
        });

    test('TC-1.2.02. User Login with Invalid Credentials (UI Feedback)',
        async ({ page }) => {
        });
})

test.describe('1.3 User Logout (UI)', () => {
    test.use({ storageState: Users[UserRoles.ADMIN].authFile });

    test('TC-1.3.01. Successful User Logout (UI Flow)',
        async ({ page }) => {
        });
})
