import { test } from '../../fixtures/myFixtures/allFixtures';
import { expect } from '@playwright/test';
import userTemplate from '../../fixtures/data/apiUser.json'


test('TC-001: Register a new user', async ({ userApiHelper }) => {
    // Generate unique email
    const uniqueEmail = `user_${Date.now()}@test.com`;
    // Build userData using the template and the generated email
    const userData = {
        ...userTemplate,
        email: uniqueEmail
    };
    // Register user
    const response = await userApiHelper.registerUser(userData);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toContain('User registered');
});

test('TC-002: Login user (POST /auth/login)', async ({ userApiHelper }) => {
    const response = await userApiHelper.loginUser(
        process.env.CUSTOMER_USERNAME as string, process.env.CUSTOMER_PASSWORD as string
    );
    expect(response.status()).toBe(200);
})

// TODO: Create a hotel by API
test('TC-003: Create a hotel (POST /my-hotels)', async ({ userApiHelper }) => {
    const response = await userApiHelper.loginUser(
        process.env.CUSTOMER_USERNAME as string, process.env.CUSTOMER_PASSWORD as string
    );
});