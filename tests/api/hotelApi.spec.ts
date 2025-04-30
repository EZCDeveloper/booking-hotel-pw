import { test } from '../../fixtures/myFixtures/allFixtures';


test.describe('Hotel API', () => {



    // TODO: Create a hotel by API
    test('TC-001: Create a hotel (POST /my-hotels)', async ({ userApiHelper }) => {
        const response = await userApiHelper.loginUser(
            process.env.ADMIN_USERNAME as string, process.env.ADMIN_PASSWORD as string
        );
    });
})