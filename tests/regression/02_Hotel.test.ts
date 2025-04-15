import { test } from '../../fixtures/myFixtures/allFixtures';
import { UserRoles, Users } from '../../support/auth/user-roles';
import { expect } from '@playwright/test';
import { HotelTestData } from '../../fixtures/data/test-data';
import { TEST_COPY } from '../../fixtures/data/test-copy';

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

            // Fill the hotel form except for the name
            await createHotelPage.navigateToMyHotels();
            await createHotelPage.clickAddHotel();
            await createHotelPage.fillBasicHotelDetails(hotelWithoutName);
            await createHotelPage.saveHotel()

            // Assert that the required field message is shown for the name field
            const errorMsgLocator = await createHotelPage.getNameFieldError();
            await expect(errorMsgLocator).toHaveText(TEST_COPY.MESSAGE.FIELD_REQUIRED);
        })

});
