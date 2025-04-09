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

// TODO: Check the tests

test.describe('TS02_Login', () => {
    test('TC-001: Verify ADMIN access', async ({ page, basePage, context }) => {
        // Ensure we're using the admin storage state
        await context.addInitScript(() => {
            window.localStorage.setItem('userRole', UserRoles.ADMIN);
        });

        // Navigate to home page
        await basePage.navigateTo('/');

        // Verify admin-specific elements or access
        const adminElements = page.getByRole('navigation').getByText('Admin Panel');
        await expect(adminElements).toBeVisible();
    });

    test('TC-002: Verify CUSTOMER access', async ({ page, basePage, context }) => {
        // Ensure we're using the customer storage state
        await context.addInitScript(() => {
            window.localStorage.setItem('userRole', UserRoles.CUSTOMER);
        });

        // Navigate to home page
        await basePage.navigateTo('/');

        // Verify customer-specific elements
        const customerElements = page.getByRole('heading', { name: 'My Bookings' });
        await expect(customerElements).toBeVisible();
    });
});
