
import { test } from "@playwright/test";

test('first test', async ({ page }) => {
    const baseURL = process.env.BASE_URL as string;

    await page.goto(baseURL);
});
