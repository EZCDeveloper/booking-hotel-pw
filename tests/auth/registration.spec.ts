import { test, expect } from '@playwright/test';
import { generateRandomEmail, validUser } from '../../fixtures/user.data';

test.describe('User Registration', () => {
    // IMPORTANT: Adjust these paths to match your MERN application's routes
    const registerPagePath = '/register';
    const loginPagePath = '/sign-in'; // Kept for reference, but success navigates to "/"
    const homePagePath = 'http://localhost:5174/'; // For successful registration redirection

    test.beforeEach(async ({ page }) => {
        await page.goto(registerPagePath);
    });

    test('TC-001: Successful User Registration', async ({ page }) => {
        const uniqueEmail = validUser.email;

        // --- Adjust locators below based on your application's actual HTML structure ---
        await page.getByLabel('First Name').fill(validUser.firstName);
        await page.getByLabel('Last Name').fill(validUser.lastName);
        await page.getByLabel('Email').fill(uniqueEmail);
        await page.getByLabel('Password', { exact: true }).fill(validUser.password);
        await page.getByLabel('Confirm Password').fill(validUser.password);

        // Adjust button name if different (e.g., 'Register', 'Sign Up')
        await page.getByRole('button', { name: 'Create Account' }).click();

        // --- IMPORTANT: Adjust success message text and selector to match your application EXACTLY ---
        // The MERN app's frontend Register.tsx shows "Registration Success!"
        await expect(page.getByText('Registration Success!', { exact: true })).toBeVisible({ timeout: 15000 });

        // Expect redirection to the home page (frontend Register.tsx navigates to "/")
        await expect(page).toHaveURL(new RegExp(`^${homePagePath}$`), { timeout: 10000 });
    });

    test('TC-007: User Registration - Attempt with Existing Email', async ({ page }) => {
        const existingEmail = generateRandomEmail();

        // First, register a user to ensure the email exists
        await page.getByLabel('First Name').fill(validUser.firstName);
        await page.getByLabel('Last Name').fill(validUser.lastName);
        await page.getByLabel('Email').fill(existingEmail);
        await page.getByLabel('Password', { exact: true }).fill(validUser.password);
        await page.getByLabel('Confirm Password').fill(validUser.password);
        await page.getByRole('button', { name: 'Create Account' }).click();

        // Wait for success message from the first registration
        // The MERN app's frontend Register.tsx shows "Registration Success!"
        await expect(page.getByText('Registration Success!', { exact: true })).toBeVisible({ timeout: 15000 });
        // await page.waitForURL(new RegExp(homePagePath), { timeout: 10000 }); // Wait for redirection to home

        // Navigate back to registration page for the second attempt
        await page.goto(registerPagePath);

        // Now, attempt to register with the same email
        await page.getByLabel('First Name').fill('AnotherFirstName');
        await page.getByLabel('Last Name').fill('AnotherLastName');
        await page.getByLabel('Email').fill(existingEmail); // Using the already registered email
        await page.getByLabel('Password', { exact: true }).fill(validUser.password);
        await page.getByLabel('Confirm Password').fill(validUser.password);
        await page.getByRole('button', { name: 'Create Account' }).click();

        // --- IMPORTANT: Adjust error message text and selector to match your application EXACTLY ---
        // The MERN app's backend sends "User already exists" - THIS WILL BE VERIFIED NEXT
        await expect(page.getByText('User already exists', { exact: true })).toBeVisible({ timeout: 10000 });

        // Ensure page hasn't redirected away from registration
        await expect(page).toHaveURL(new RegExp(registerPagePath));
    });
});