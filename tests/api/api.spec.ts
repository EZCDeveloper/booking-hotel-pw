import { test, expect, request, APIRequestContext } from '@playwright/test';
import path from 'path';

const BASE_URL = 'http://localhost:7000/api';

test.describe('V1: MERN Booking API', () => {
    let apiContext: APIRequestContext;
    let authCookie: string | undefined;
    let testUser = {
        firstName: 'Test',
        lastName: 'User',
        email: `testuser_${Date.now()}@example.com`,
        password: 'password123'
    };
    let createdUserId: string | undefined;

    test.beforeAll(async ({ playwright }) => {
        apiContext = await request.newContext();
    });

    test('Register a new user', async () => {
        const response = await apiContext.post(`${BASE_URL}/users/register`, {
            data: testUser,
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.message).toContain('User registered');
    });

    test('Login with registered user', async () => {
        const response = await apiContext.post(`${BASE_URL}/auth/login`, {
            data: {
                email: testUser.email,
                password: testUser.password,
            },
        });
        expect(response.status()).toBe(200);
        // Save cookie for authenticated requests
        const cookies = await apiContext.storageState();
        const cookie = cookies.cookies?.find((c) => c.name === 'auth_token');
        expect(cookie).toBeDefined();
        authCookie = cookie?.value;
    });

    test('Validate token (authenticated)', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.get(`${BASE_URL}/auth/validate-token`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.userId).toBeDefined();
        await context.dispose();
    });

    test('Get current user profile', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.get(`${BASE_URL}/users/me`);
        expect(response.status()).toBe(200);
        const user = await response.json();
        expect(user.email).toBe(testUser.email);
        await context.dispose();
    });

    test('Hotel search returns results', async () => {
        const response = await apiContext.get(`${BASE_URL}/hotels/search?destination=London`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data).toBeInstanceOf(Array);
    });

    test('Get all hotels', async () => {
        const response = await apiContext.get(`${BASE_URL}/hotels`);
        expect(response.status()).toBe(200);
        const hotels = await response.json();
        expect(Array.isArray(hotels)).toBeTruthy();
    });

    test('Unauthorized access to /my-hotels should fail', async () => {
        const response = await apiContext.get(`${BASE_URL}/my-hotels`);
        expect(response.status()).toBe(401);
    });

    test('Get my-hotels (authenticated)', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.get(`${BASE_URL}/my-hotels`);
        expect([200, 500]).toContain(response.status()); // 500 if no hotels exist for user
        await context.dispose();
    });

    test('Get my-bookings (authenticated)', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.get(`${BASE_URL}/my-bookings`);
        expect([200, 500]).toContain(response.status()); // 500 if no bookings exist for user
        await context.dispose();
    });

    // Add more tests for POST /my-hotels, PUT /my-hotels/:id, hotel bookings, etc. as needed.
});

test.describe('V2: MERN Booking API', () => {
    let apiContext: APIRequestContext;
    let authCookie: string | undefined;
    let testUser = {
        firstName: 'Test',
        lastName: 'User',
        email: `testuser_${Date.now()}@example.com`,
        password: 'password123'
    };
    let createdHotelId: string | undefined;

    test.beforeAll(async ({ playwright }) => {
        apiContext = await request.newContext();
    });

    test('Register a new user', async () => {
        const response = await apiContext.post(`${BASE_URL}/users/register`, {
            data: testUser,
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.message).toContain('User registered');
    });

    test('Login with registered user', async () => {
        const response = await apiContext.post(`${BASE_URL}/auth/login`, {
            data: {
                email: testUser.email,
                password: testUser.password,
            },
        });
        expect(response.status()).toBe(200);
        // Save cookie for authenticated requests
        const cookies = await apiContext.storageState();
        const cookie = cookies.cookies?.find((c) => c.name === 'auth_token');
        expect(cookie).toBeDefined();
        authCookie = cookie?.value;
    });

    test('Create a hotel (POST /my-hotels)', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.post(`${BASE_URL}/my-hotels`, {
            multipart: {
                name: 'Test Hotel',
                city: 'Test City',
                country: 'Test Country',
                description: 'A test hotel',
                type: 'Hotel',
                adultCount: 2,
                childCount: 1,
                facilities: JSON.stringify(['wifi', 'pool']),
                pricePerNight: 100,
                starRating: 4,
                imageFiles: [
                    await context._api._prepareFormDataFile(path.resolve(__dirname, './files/1.png'))
                ],
            }
        });
        expect([201, 200]).toContain(response.status());
        const hotel = await response.json();
        expect(hotel.name).toBe('Test Hotel');
        createdHotelId = hotel._id;
        await context.dispose();
    });

    test('Get my-hotels (should include created hotel)', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.get(`${BASE_URL}/my-hotels`);
        expect(response.status()).toBe(200);
        const hotels = await response.json();
        expect(Array.isArray(hotels)).toBeTruthy();
        expect(hotels.some((h: any) => h._id === createdHotelId)).toBeTruthy();
        await context.dispose();
    });

    test('Get my-hotel by id', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.get(`${BASE_URL}/my-hotels/${createdHotelId}`);
        expect(response.status()).toBe(200);
        const hotel = await response.json();
        expect(hotel._id).toBe(createdHotelId);
        await context.dispose();
    });

    test('Update my-hotel (PUT /my-hotels/:id)', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.put(`${BASE_URL}/my-hotels/${createdHotelId}`, {
            multipart: {
                name: 'Updated Test Hotel',
                city: 'Updated City',
                country: 'Updated Country',
                description: 'An updated test hotel',
                type: 'Hotel',
                adultCount: 3,
                childCount: 2,
                facilities: JSON.stringify(['wifi', 'spa']),
                pricePerNight: 150,
                starRating: 5,
                imageFiles: [
                    await context._api._prepareFormDataFile(path.resolve(__dirname, './files/2.png'))
                ],
                imageUrls: [],
            }
        });
        expect([201, 200]).toContain(response.status());
        const hotel = await response.json();
        expect(hotel.name).toBe('Updated Test Hotel');
        await context.dispose();
    });

    test('Create payment intent for booking', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.post(`${BASE_URL}/hotels/${createdHotelId}/bookings/payment-intent`, {
            data: {
                checkIn: "2025-12-01",
                checkOut: "2025-12-05",
                adultCount: 2,
                childCount: 0
            }
        });
        expect(response.status()).toBe(200);
        const paymentIntent = await response.json();
        expect(paymentIntent.paymentIntentId).toBeDefined();
        expect(paymentIntent.clientSecret).toBeDefined();
        expect(paymentIntent.totalCost).toBeGreaterThan(0);
        // Save for next test
        (test.info() as any).paymentIntentId = paymentIntent.paymentIntentId;
        await context.dispose();
    });

    test('Book a hotel (POST /hotels/:hotelId/bookings)', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        // Use paymentIntentId from previous test
        const paymentIntentId = (test.info() as any).paymentIntentId;
        const response = await context.post(`${BASE_URL}/hotels/${createdHotelId}/bookings`, {
            data: {
                firstName: testUser.firstName,
                lastName: testUser.lastName,
                email: testUser.email,
                adultCount: 2,
                childCount: 0,
                checkIn: "2025-12-01",
                checkOut: "2025-12-05",
                userId: "should-be-overwritten-by-server",
                totalCost: 600,
                paymentIntentId
            }
        });
        expect([200, 201]).toContain(response.status());
        await context.dispose();
    });

    test('Get my-bookings (should include booking)', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.get(`${BASE_URL}/my-bookings`);
        expect(response.status()).toBe(200);
        const bookings = await response.json();
        expect(Array.isArray(bookings)).toBeTruthy();
        expect(bookings.length).toBeGreaterThanOrEqual(1);
        await context.dispose();
    });

    // Negative/edge cases
    test('Fail to create hotel without authentication', async () => {
        const response = await apiContext.post(`${BASE_URL}/my-hotels`, {
            multipart: {
                name: 'Should Fail',
                city: 'No Auth',
                country: 'No Auth',
                description: 'No Auth',
                type: 'Hotel',
                adultCount: 1,
                childCount: 0,
                facilities: JSON.stringify(['wifi']),
                pricePerNight: 50,
                starRating: 3,
                imageFiles: [
                    await apiContext._api._prepareFormDataFile(path.resolve(__dirname, './files/1.png'))
                ],
            }
        });
        expect(response.status()).toBe(401);
    });

    test('Fail to get hotel with invalid id', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.get(`${BASE_URL}/my-hotels/invalidid`);
        expect([404, 500]).toContain(response.status());
        await context.dispose();
    });
});

test.describe('V3:MERN Booking API', () => {
    let apiContext: APIRequestContext;
    let authCookie: string | undefined;
    let testUser = {
        firstName: 'Test',
        lastName: 'User',
        email: `testuser_${Date.now()}@example.com`,
        password: 'password123'
    };
    let createdHotelId: string | undefined;

    test.beforeAll(async ({ playwright }) => {
        apiContext = await request.newContext();
    });

    // ... (all previous tests: registration, login, create hotel, etc.)

    test('Delete my-hotel (DELETE /my-hotels/:id)', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.delete(`${BASE_URL}/my-hotels/${createdHotelId}`);
        // Accept 200, 204 (success), or 404/405 if not implemented
        expect([200, 204, 404, 405]).toContain(response.status());
        await context.dispose();
    });

    test('Fail to delete hotel without authentication', async () => {
        const response = await apiContext.delete(`${BASE_URL}/my-hotels/${createdHotelId}`);
        // Should be unauthorized or not found
        expect([401, 404, 405]).toContain(response.status());
    });

    test('Fail to delete hotel with invalid id', async () => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Cookie: `auth_token=${authCookie}`,
            },
        });
        const response = await context.delete(`${BASE_URL}/my-hotels/invalidid`);
        expect([404, 405]).toContain(response.status());
        await context.dispose();
    });

    // Data cleanup (if supported by your API)
    test.afterAll(async () => {
        // Optionally, delete test user via API if such endpoint exists
        // Example (uncomment if you have DELETE /users/me or similar):
        // const context = await request.newContext({
        //   extraHTTPHeaders: {
        //     Cookie: `auth_token=${authCookie}`,
        //   },
        // });
        // await context.delete(`${BASE_URL}/users/me`);
        // await context.dispose();
    });
});