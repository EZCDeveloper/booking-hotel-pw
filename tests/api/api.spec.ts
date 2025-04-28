// tests/api/api.spec.ts
import { test } from '../../fixtures/myFixtures/allFixtures';
import { expect } from '@playwright/test';
import hotelData from '../../fixtures/data/apiHotel.json';

test('Create a hotel (POST /my-hotels)', async ({ apiHelper }) => {

});

test('Login user (POST /auth/login)', async ({ apiHelper }) => {
    const response = await apiHelper.loginUser('manutestv1@gmail.com', '123456789');
    expect(response.status()).toBe(200);
})
