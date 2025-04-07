import { test as setup } from "@playwright/test"


setup('Create Admin Auth', async ({ page }) => {
    const baseUrl = process.env.BASE_URL as string
    await page.goto(baseUrl)

    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('myemailhere@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456789');
    await page.getByRole('button', { name: 'Login' }).click();
})