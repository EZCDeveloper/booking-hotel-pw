import { test } from '../../fixtures/myFixtures/allFixtures';
import { expect } from '@playwright/test'
import { UserRoles, Users } from '../../support/auth/user-roles';


test.describe('TS01_Register', () => {
    test.beforeEach(async ({ }) => {
    })

    test('TC01. Should register as Hotel Owner successfully',
        async ({ page }) => {
            console.log("Homework Challenge");
        });

    test('TC02[-]. Should fail to register as Hotel Owner: email already exists',
        async ({ page }) => {
            console.log("Homework Challenge");
        });

    test('TC03. Should register as Customer successfully',
        async ({ page }) => {
            console.log("Homework Challenge");
        });

    test('TC04[-]. Should fail to register as Customer: email already exists',
        async ({ page }) => {
            console.log("Homework Challenge");
        });
})

test.describe('TS02_Login', () => {
    test.use({ storageState: Users[UserRoles.ADMIN].authFile });

    test('TC-001: Should login as Hotel Owner', async ({ page, basePage }) => {
        // 1. Navigate to home page
        await basePage.navigateTo('/');

        // 2. Verify My Hotel nav is visible
        const myHotelsNav = page.getByRole('link', { name: 'My Hotels' })
        await expect(myHotelsNav).toBeVisible()
    });
})
