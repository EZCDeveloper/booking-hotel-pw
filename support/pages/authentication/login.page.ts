import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/base.page';
import { UserRoles, Users } from '../../auth/user-roles';

export class LoginPage extends BasePage {
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

        await expect(this.page.getByText('Sign in Successful!')).toContainText('Sign in Successful!');
    }

    async logout() {
        // Implement logout logic if needed
    }
}