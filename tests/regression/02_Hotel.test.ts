import { test } from '../../fixtures/myFixtures/allFixtures';
import { UserRoles, Users } from '../../support/auth/user-roles';
import { expect } from '@playwright/test';
import { HotelTestData } from '../../fixtures/data/test-data';

test.describe('TS01_Create Hotel', () => {

    test.use({ storageState: Users[UserRoles.ADMIN].authFile });

    test('TC-001: Should Create a Hotel: [children: 60]',
        async ({ basePage, createHotelPage }) => {
            // 1. Login and navigate to home page
            await basePage.navigateTo('/');

            // 2-5. Create hotel using Page Object Model
            await createHotelPage.createHotel(HotelTestData.validHotel);
        })

    //TC-002[-]: Should Fail to create a Hotel: name is missing.
    test('TC-002: Should Fail to create a Hotel: name is missing',
        async ({ basePage, createHotelPage }) => {
            // 1. Login and navigate to home page
            await basePage.navigateTo('/');

            // Create a copy of validHotel with an empty name
            const hotelWithoutName = { ...HotelTestData.validHotel, name: '' };

            // 2-5. Create hotel using Page Object Model
            await createHotelPage.createHotel(hotelWithoutName);

            // 6. Verify that the hotel is not saved (expect an error or validation message)
            await expect(createHotelPage.getErrorMessage()).toContain('This field is required');
            // TODO: The Save button is still clicked even when the name is missing
        })

});
