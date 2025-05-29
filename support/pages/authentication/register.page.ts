import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '../base/base.page';

export class RegisterPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name', exact: true });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name', exact: true });
        this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true });
        this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password', exact: true });
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    }

    async fillRegistrationForm(firstName: string, lastName: string, email: string, password: string, confirmPassword?: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        if (confirmPassword !== undefined) { // Only fill if provided, for scenarios testing mismatched passwords etc.
            await this.confirmPasswordInput.fill(confirmPassword);
        }
    }

    async clickCreateAccountButton(): Promise<void> {
        await this.createAccountButton.click();
    }

    async registerUser(firstName: string, lastName: string, email: string, password: string, confirmPassword?: string): Promise<void> {
        await this.fillRegistrationForm(firstName, lastName, email, password, confirmPassword || password);
        await this.clickCreateAccountButton();
    }

    getErrorMessageLocator(fieldLabel?: string) {
        if (fieldLabel) {
            // This assumes error messages appear near their respective fields
            // and might need adjustment based on actual HTML structure.
            // Example: return this.page.locator(`label:has-text("${fieldLabel}") + .error-message`);
            return this.page.getByLabel(fieldLabel).locator('..').locator('.text-red-500'); // Example: common pattern for error messages
        }
        // For general form error messages (e.g., "User already exists")
        return this.page.getByText(/User already exists|Email is already in use/i);
    }
}
