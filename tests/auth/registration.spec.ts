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

    test('TC-1.1.01: Successful User Registration (UI Flow)', async ({ page }) => {
        const uniqueEmail = generateRandomEmail(); // Ensures truly unique email for this test

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

    test('TC-1.1.02: User Registration with Existing Email (UI Feedback)', async ({ page }) => {
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

    test('TC-1.1.03: User Registration with Invalid Input (UI Validations)', async ({ page }) => {
        const { firstName, lastName, password } = validUser;

        // Scenario 1: Missing First Name
        await page.getByLabel('Last Name').fill(lastName);
        await page.getByLabel('Email').fill(generateRandomEmail());
        await page.getByLabel('Password', { exact: true }).fill(password);
        await page.getByLabel('Confirm Password').fill(password);
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('First Name is required')).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL(new RegExp(registerPagePath));
        await page.goto(registerPagePath); // Reset for next scenario

        // Scenario 2: Missing Last Name
        await page.getByLabel('First Name').fill(firstName);
        await page.getByLabel('Email').fill(generateRandomEmail());
        await page.getByLabel('Password', { exact: true }).fill(password);
        await page.getByLabel('Confirm Password').fill(password);
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Last Name is required')).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL(new RegExp(registerPagePath));
        await page.goto(registerPagePath);

        // Scenario 3: Missing Email
        await page.getByLabel('First Name').fill(firstName);
        await page.getByLabel('Last Name').fill(lastName);
        await page.getByLabel('Password', { exact: true }).fill(password);
        await page.getByLabel('Confirm Password').fill(password);
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Email is required')).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL(new RegExp(registerPagePath));
        await page.goto(registerPagePath);

        // Scenario 4: Missing Password
        await page.getByLabel('First Name').fill(firstName);
        await page.getByLabel('Last Name').fill(lastName);
        await page.getByLabel('Email').fill(generateRandomEmail());
        await page.getByLabel('Confirm Password').fill(password);
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Password is required')).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL(new RegExp(registerPagePath));
        await page.goto(registerPagePath);

        // Scenario 5: Missing Confirm Password
        await page.getByLabel('First Name').fill(firstName);
        await page.getByLabel('Last Name').fill(lastName);
        await page.getByLabel('Email').fill(generateRandomEmail());
        await page.getByLabel('Password', { exact: true }).fill(password);
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Confirm Password is required')).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL(new RegExp(registerPagePath));
        await page.goto(registerPagePath);

        // Scenario 6: Invalid Email Format
        await page.getByLabel('First Name').fill(firstName);
        await page.getByLabel('Last Name').fill(lastName);
        await page.getByLabel('Email').fill('invalidemailformat');
        await page.getByLabel('Password', { exact: true }).fill(password);
        await page.getByLabel('Confirm Password').fill(password);
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Email is invalid')).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL(new RegExp(registerPagePath));
        await page.goto(registerPagePath);

        // Scenario 7: Mismatched Passwords
        await page.getByLabel('First Name').fill(firstName);
        await page.getByLabel('Last Name').fill(lastName);
        await page.getByLabel('Email').fill(generateRandomEmail());
        await page.getByLabel('Password', { exact: true }).fill(password);
        await page.getByLabel('Confirm Password').fill('differentpassword');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Passwords do not match')).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL(new RegExp(registerPagePath));
    });
});