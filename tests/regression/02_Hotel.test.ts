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

});
