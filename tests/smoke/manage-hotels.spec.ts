import { test, expect } from '@playwright/test';
import { validUser } from '../../fixtures/user.data';
import path from 'path';

test.describe('Manage Hotels', () => {
    const signInPagePath = '/sign-in';
    const myHotelsPagePath = '/my-hotels';
    const addHotelPagePath = '/add-hotel';

    const newHotel = {
        name: 'Test Hotel Paradise',
        city: 'TestVille',
        country: 'Testland',
        description: 'A beautiful test hotel with all modern amenities and great views.',
        type: 'Budget', // Must match one of the hotelTypes in TypeSection
        pricePerNight: 120,
        starRating: 4,
        facilities: ['Free WiFi', 'Parking'], // Must match hotelFacilities in FacilitiesSection
        adultCount: 2,
        childCount: 1,
        imagePath: path.join(__dirname, '../../fixtures/images/add-hotel.png') // Path to a dummy image
    };

    test('TC-006: Add New Hotel', async ({ page }) => {
        // 1. Login
        await page.goto(signInPagePath);
        await page.getByLabel('Email').fill(validUser.email);
        await page.getByLabel('Password', { exact: true }).fill(validUser.password);
        await page.getByRole('button', { name: 'Login' }).click();

        // Wait for login success toast
        const successLoginToast = page.getByText('Sign in Successful!');
        await expect(successLoginToast).toBeVisible({ timeout: 10000 });
        console.log("Login successful, 'Sign in Successful!' toast found.");

        // 2. Navigate to Add Hotel Page
        await page.getByRole('link', { name: 'My Hotels' }).click();
        await expect(page).toHaveURL(myHotelsPagePath);
        await page.getByRole('link', { name: 'Add Hotel' }).click();
        await expect(page).toHaveURL(addHotelPagePath);
        await expect(page.getByRole('heading', { name: 'Add Hotel', level: 1 })).toBeVisible(); // From DetailsSection

        // 3. Fill Details Section
        await page.getByLabel('Name').fill(newHotel.name);
        await page.getByLabel('City').fill(newHotel.city);
        await page.getByLabel('Country').fill(newHotel.country);
        await page.getByLabel('Description').fill(newHotel.description);
        await page.getByLabel('Price Per Night').fill(newHotel.pricePerNight.toString());
        await page.getByLabel('Star Rating').selectOption({ value: newHotel.starRating.toString() });

        // 4. Fill Type Section
        await page.getByText(newHotel.type, { exact: true }).click(); // Clicks the label for the radio button

        // 5. Fill Facilities Section
        for (const facility of newHotel.facilities) {
            await page.getByLabel(facility, { exact: true }).check();
        }

        // 6. Fill Guests Section
        await page.getByLabel('Adults', { exact: true }).fill(newHotel.adultCount.toString());
        await page.getByLabel('Children', { exact: true }).fill(newHotel.childCount.toString());

        // 7. Upload Images
        await page.locator('input[type="file"][name="imageFiles"]').setInputFiles(newHotel.imagePath);

        // 8. Submit Form
        await page.getByRole('button', { name: 'Save' }).click();

        // 9. Verify Success
        const successHotelSavedToast = page.getByText('Hotel Saved!');
        await expect(successHotelSavedToast).toBeVisible({ timeout: 15000 });
        console.log("'Hotel Saved!' toast found.");

        // 10. Verify in "My Hotels"
        // The page should ideally redirect or provide a clear path back. For now, navigate directly.
        await page.getByRole('link', { name: 'My Hotels' }).click(); // Assuming 'My Hotels' link is still available or user navigates via header
        await expect(page).toHaveURL(myHotelsPagePath, { timeout: 10000 });

        // Find the newly added hotel card
        const hotelCard = page.locator('div[data-testid="hotel-card"]', { hasText: newHotel.name }).first();
        await expect(hotelCard).toBeVisible();

        // Verify some details on the card
        await expect(hotelCard.getByRole('heading', { name: newHotel.name, level: 2 })).toBeVisible();
        await expect(hotelCard.getByText(`${newHotel.city}, ${newHotel.country}`)).toBeVisible();
        await expect(hotelCard.getByText(`$${newHotel.pricePerNight} per night`)).toBeVisible();
        await expect(hotelCard.getByText(`${newHotel.starRating} Star Rating`)).toBeVisible();
        await expect(hotelCard.getByText(`${newHotel.adultCount} adults, ${newHotel.childCount} children`)).toBeVisible();
    });
});
