import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/base.page';
import { UserRoles, Users } from '../../auth/user-roles';

export class LoginPage extends BasePage {
    readonly errorMessage: any; // Added to hold the error message locator instance

    constructor(page: Page) {
        super(page);
    }

    async loginAs(role: UserRoles) {
        const baseUrl = process.env.BASE_URL as string;
        await this.page.goto(baseUrl);

        const user = Users[role];
        if (!user) {
            throw new Error(`User role ${role} not found`);
        }
        await this.login(user.username, user.password);
    }

    async login(username: string, password: string) {
        await this.page.getByRole('link', { name: 'Sign In' }).click();
        await this.page.getByRole('textbox', { name: 'Email' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();

    }

    getErrorMessageLocator() {
        // Using a flexible regex to catch common variations of invalid login messages
        return this.page.getByText(/Invalid credentials|Email or password incorrect|Login failed/i);
    }

    async logout() {
        // Assuming the logout button is consistently available and named 'Sign Out'
        await this.page.getByRole('button', { name: 'Sign Out' }).click();
    }
}