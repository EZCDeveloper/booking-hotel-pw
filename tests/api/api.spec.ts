// tests/api/api.spec.ts
import { test } from '../../fixtures/myFixtures/allFixtures';
import { expect } from '@playwright/test';
import hotelData from '../../fixtures/data/apiHotel.json';

test('Create a hotel (POST /my-hotels)', async ({ apiHelper }) => {
    // Obtén el auth_token directamente con el nuevo método
    const authCookie = await apiHelper.getAuthToken('manutestv1@gmail.com', '123456789');
    expect(authCookie).toBeDefined();

    // Crea el hotel usando la data del JSON
    const { status, body } = await apiHelper.createHotel(authCookie, hotelData);

    // Agrega logs para debuggear el error 500
    console.log('Status:', status);
    console.log('Body:', body);

    expect([201, 200]).toContain(status);

    // Si necesitas el objeto hotel y la respuesta es JSON válida:
    // const hotel = JSON.parse(body);
    // expect(hotel.name).toBe(hotelData.name;

    //const hotel = await response.json();
    // Aquí puedes agregar más asserts si lo necesitas
});
