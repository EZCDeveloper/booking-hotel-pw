// tests/api/api.spec.ts
import { test } from '../../fixtures/myFixtures/allFixtures';
import { expect } from '@playwright/test';
import hotelData from '../../fixtures/data/apiHotel.json';

test('Create a hotel (POST /my-hotels)', async ({ apiHelper }) => {
    // Supón que ya tienes el authCookie tras login (puedes hacer login con apiHelper.loginUser)
    const loginResponse = await apiHelper.loginUser('manutestv1@gmail.com', '123456789');
    expect(loginResponse.status()).toBe(200);

    // Obtén el auth_token del login
    const cookies = await loginResponse.request().storageState();
    const authCookie = cookies.cookies?.find((c: any) => c.name === 'auth_token')?.value;
    expect(authCookie).toBeDefined();

    // Crea el hotel usando la data del JSON
    const response = await apiHelper.createHotel(authCookie, hotelData);
    expect([201, 200]).toContain(response.status());

    const hotel = await response.json();
    expect(hotel.name).toBe(hotelData.name);
});
