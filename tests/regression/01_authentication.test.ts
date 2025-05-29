import { test } from '../../fixtures/myFixtures/allFixtures';
import { UserRoles, Users } from '../../support/auth/user-roles';
import { expect } from '@playwright/test';
import { invalidUser, newUser, validUser, registrationValidationTestCases } from '../../fixtures/data/test-data';
import { URL } from '../../fixtures/data/url-copy';

test.describe('1.1 User Registration (UI)', () => {
    // No beforeEach needed here if tests navigate independently
    // test.beforeEach(async ({ registerPage }) => {
    // await registerPage.navigateToRegisterPage();
    // });

    test('TC-1.1.01. Successful User Registration (UI Flow)',
        async ({ page, registerPage, basePage }) => {
            // 1. Navigate to the registration page
            await basePage.navigateTo(URL.REGISTER);

            // 2. Fill in registration form and submit
            // The newUser object now generates a unique email with a timestamp
            await registerPage.registerUser(
                newUser.firstName,
                newUser.lastName,
                newUser.email,
                newUser.password
                // confirmPassword will be the same as password by default in registerUser method
            );

            // 3. Verify success message is displayed or User welcomed
            const successMessage = page.getByText('Registration Success!');
            await expect(successMessage).toBeVisible();

            // 4. Verify user is redirected and logged in
            //    Check for an element that indicates a logged-in state, e.g., 'Sign Out' button or welcome message.
            const signOutButton = page.getByRole('button', { name: 'Sign Out' });
            await expect(signOutButton).toBeVisible({ timeout: 10000 });

            // 5. Optionally, verify the URL has changed (e.g., to home page)
            // await expect(page.url()).toBe(process.env.BASE_URL + '/');
        });

    test('TC-1.1.02. User Registration Invalid with Existing Email (UI Feedback)',
        async ({ page, registerPage, basePage }) => {
            // 1. Navigate to the registration page
            await basePage.navigateTo(URL.REGISTER);

            // 2. Attempt to register with an existing email
            //    Using validUser's email, assuming this user would be pre-existing or created in a setup step.
            //    Other details can be new or same, the email is the key.
            await registerPage.registerUser(
                'AnotherFirstName', // Or validUser.firstName
                'AnotherLastName',  // Or validUser.lastName
                validUser.email,    // THE EXISTING EMAIL
                'SomeOtherPassword123!' // Or validUser.password
            );

            // 3. Verify error message is displayed
            //    The RegisterPage.getErrorMessageLocator() is designed to find general form errors like "User already exists"
            const errorMessage = registerPage.getErrorMessageLocator();
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText(/User already exists|Email is already in use/i);

            // 4. Verify user remains on the registration page
            expect(page.url()).toContain(URL.REGISTER);

            // 5. Verify that the 'Sign Out' button is NOT visible (user should not be logged in)
            const signOutButton = page.getByRole('button', { name: 'Sign Out' });
            await expect(signOutButton).not.toBeVisible();
        });

    test('TC-1.1.03. User Registration Invalid with Invalid Input (UI Validations)',
        async ({ page, registerPage, basePage }) => {
            for (const tc of registrationValidationTestCases) {
                await basePage.navigateTo(URL.REGISTER);

                await registerPage.fillRegistrationForm(
                    tc.data.firstName,
                    tc.data.lastName,
                    tc.data.email,
                    tc.data.password,
                    tc.data.confirmPassword
                );
                await registerPage.clickCreateAccountButton();

                if (tc.isNativeHTML5Validation) {
                    const emailInputElement = registerPage.emailInput;
                    const validationMessage = await emailInputElement.evaluate(element => (element as HTMLInputElement).validationMessage);
                    expect(validationMessage, `Native validation message for '${tc.description}' did not match. Expected: '${tc.expectedError}'. Got: '${validationMessage}'`).toMatch(tc.expectedError);
                } else {
                    const errorMessageLocator = page.getByText(tc.expectedError);
                    await expect(errorMessageLocator, `Custom error message for '${tc.description}' not visible or incorrect. Expected: '${tc.expectedError}'`).toBeVisible({ timeout: 7000 });
                }

                expect(page.url(), `URL check for '${tc.description}' failed.`).toContain(URL.REGISTER);
                const signOutButton = page.getByRole('button', { name: 'Sign Out' });
                await expect(signOutButton, `'Sign Out' button should not be visible for '${tc.description}'.`).not.toBeVisible();
            }
        });
})

test.describe('1.2 User Login (UI)', () => {

    test.describe('Logged In Scenarios', () => {
        test.use({ storageState: Users[UserRoles.ADMIN].authFile });

        test('TC-1.2.01. Successful User Login (UI Flow)',
            async ({ page, basePage }) => {
                // This test verifies that the storageState allows access to a logged-in area
                // 1. Navigate to home page
                await basePage.navigateTo('/');

                // 2. Verify a UI element specific to the logged-in user is visible
                //    (e.g., a welcome message or a link to user-specific pages)
                //    The text '👋 Hi, Sebastian!' is specific to the ADMIN user defined in authFile.
                const welcomeMessage = page.getByText('👋 Hi, Sebastian!');
                await expect(welcomeMessage).toBeVisible();
            });
    });

    test.describe('Login Process Scenarios', () => {
        // Tests in this block start without a pre-authenticated state (no storageState)

        test('TC-1.2.02. User Login with Invalid Credentials (UI Feedback)',
            async ({ page, loginPage, basePage }) => {
                // 1. Navigate to the home page (or any page with a 'Sign In' link)
                await basePage.navigateTo('/');

                // 2. Attempt to login with invalid credentials
                // The loginPage.login() method handles clicking 'Sign In', filling the form, and submitting
                await loginPage.login(invalidUser.email, invalidUser.password);

                // 3. Verify error message is displayed
                const errorMessage = loginPage.getErrorMessageLocator();
                await expect(errorMessage).toBeVisible();
                // Optionally, assert the text of the error message if it's reliably consistent:
                // await expect(errorMessage).toHaveText(/Invalid credentials|Email or password incorrect|Login failed/i);

                // 4. Verify user remains on the login page
                // The login() method clicks 'Sign In', which navigates to the login page (e.g., '/sign-in').
                // After a failed login attempt, the URL should still be the login page.
                expect(page.url()).toContain('/sign-in');
            });
    });
})

test.describe('1.3 User Logout (UI)', () => {
    test.use({ storageState: Users[UserRoles.ADMIN].authFile });

    test('TC-1.3.01. Successful User Logout (UI Flow)',
        async ({ page, loginPage, basePage }) => {
            // 1. Navigate to the home page (user is already logged in due to storageState)
            await basePage.navigateTo('/');

            // 2. Perform logout
            await loginPage.logout();

            // 3. Verify redirection to the sign-in page or homepage (as guest)
            //    Checking for the presence of the 'Sign In' link is a good indicator of being logged out.
            await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();

            // 4. Optionally, verify the URL if it consistently redirects to a specific page after logout
            //    For example, if it redirects to the home page and shows 'Sign In':
            // await expect(page.url()).toBe(process.env.BASE_URL + '/'); 
            // Or if it redirects directly to the sign-in page:
            // await expect(page.url()).toContain('/sign-in');

            // 5. Verify that a success message for logout is displayed (if applicable
            await expect(page.getByText('Signed Out!')).toBeVisible();
        });
})
