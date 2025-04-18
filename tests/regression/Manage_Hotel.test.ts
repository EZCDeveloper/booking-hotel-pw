import { test } from '../../fixtures/myFixtures/allFixtures';
import { UserRoles, Users } from '../../support/auth/user-roles';
import { expect } from '@playwright/test';
import { HotelTestData } from '../../fixtures/data/test-data';
import { TEST_COPY } from '../../fixtures/data/test-copy';
import apiHotel from '../../fixtures/data/apiHotel.json';

test.describe('TS01_Create Hotel', () => {

    test.use({ storageState: Users[UserRoles.ADMIN].authFile });

    test('TC-001: Should Create a Hotel: [children: 60]',
        async ({ basePage, createHotelPage }) => {
            // 1. Login and navigate to home page
            await basePage.navigateTo('/');

            // 2-5. Create hotel using Page Object Model
            await createHotelPage.createHotel(HotelTestData.validHotel);
        })

    test('TC-002: Should Fail to create a Hotel: name is missing',
        async ({ basePage, createHotelPage }) => {
            // 1. Login and navigate to home page
            await basePage.navigateTo('/');

            // Create a copy of validHotel with an empty name
            const hotelWithoutName = { ...HotelTestData.validHotel, name: '' };

            // 2. Fill the hotel form except for the name
            await createHotelPage.navigateToMyHotels();
            await createHotelPage.clickAddHotel();
            await createHotelPage.fillBasicHotelDetails(hotelWithoutName);
            await createHotelPage.saveHotel()

            // 3. Assert that the required field message is shown for the name field
            const errorMsgLocator = await createHotelPage.getNameFieldError();
            await expect(errorMsgLocator).toHaveText(TEST_COPY.MESSAGE.FIELD_REQUIRED);
        })
});

test.describe('TS01_Edit a Hotel', () => {

    test.use({ storageState: Users[UserRoles.ADMIN].authFile });

    test('TC-001: Should Edit a Hotel', async ({ page, basePage, createHotelPage, myHotelsPage, apiHelper }) => {


        // 1. Login and navigate to home page
        await basePage.navigateTo('/');

        // 2. Edit the name of the hotel via UI
        await createHotelPage.navigateTo(TEST_COPY.HEADER_NAV.MY_HOTELS)

        const myHotels = page.getByRole('heading', { name: 'My Hotels' }).filter({ visible: true })
        expect(myHotels).toBeTruthy()

        // Filter hotel cards by text and click 'View Details'
        // Extrae una función para encontrar la tarjeta del hotel por nombre
        await myHotelsPage.watchHotelDetails("Grandes Aventuras");
    });
})