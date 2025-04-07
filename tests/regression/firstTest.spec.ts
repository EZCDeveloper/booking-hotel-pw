import { test, expect } from "@playwright/test"

test("TC-001: Navigate to Home Page", async ({ page }) => {
    const baseUrl = process.env.BASE_URL as string
    await page.goto(baseUrl)
})