import { test } from '../../fixtures/myFixtures/allFixtures';
import { expect } from '@playwright/test'
import { UserRoles, Users } from '../../support/auth/user-roles';


test.describe('TS01_Register', () => {
    test.beforeEach(async ({ }) => {
    })

    test('TC01. Register Successfully', async ({ page }) => {
        console.log("Homework Challenge");
    });

    test('TC02. Fail to register a user: email address already exists in the database', async ({ page }) => {
        console.log("Homework Challenge");
    });

    test('TC03. Fail to register a user: password has not minimum length', async ({ page }) => {
        console.log("Homework Challenge");
    });

})

// TODO: Check the tests

test.describe('TS01_Admin Functionality Tests', () => {
    // Use admin storage state for all tests in this describe block
    test.use({ storageState: Users[UserRoles.ADMIN].authFile });

    test('TC-001: Verify Admin Dashboard Access', async ({ page, loginPage }) => {
        // Navigate to base URL
        await page.goto(process.env.BASE_URL as string);

        // Optional: You can still use loginPage if needed
        // await loginPage.loginAs(UserRoles.ADMIN);

        // Add assertions specific to admin role
        const adminDashboardTitle = await page.getByRole('heading', { name: 'Admin Dashboard' });
        expect(adminDashboardTitle).toBeVisible();

        // Example of admin-specific action
        const createUserButton = await page.getByRole('button', { name: 'Create User' });
        expect(createUserButton).toBeVisible();
    });

    test('TC-Admin: Verify Admin Permissions', async ({ page }) => {
        await page.goto(process.env.BASE_URL as string);

        // Check for admin-specific elements or actions
        const adminSettingsMenu = await page.getByRole('link', { name: 'Admin Settings' });
        expect(adminSettingsMenu).toBeVisible();

        // You can add more specific checks for admin privileges
        const sensitiveDataTable = await page.getByTestId('sensitive-data-table');
        expect(sensitiveDataTable).toBeVisible();
    });
});
