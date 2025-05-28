import { test as setup } from '../../fixtures/myFixtures/allFixtures';
import { UserRoles } from '../../support/auth/user-roles';
import { LoginPage } from '../../support/pages/authentication/login.page';
import path from 'path';

const authFile = {
    [UserRoles.ADMIN]: path.join(__dirname, '../../../.auth/admin.json'),
    [UserRoles.CUSTOMER]: path.join(__dirname, '../../../.auth/customer.json')
};

setup(`Create ${UserRoles.ADMIN} Auth`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAs(UserRoles.ADMIN);

    await page.context().storageState({ path: authFile[UserRoles.ADMIN] });
});

setup(`Create ${UserRoles.CUSTOMER} Auth`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAs(UserRoles.CUSTOMER);

    await page.context().storageState({ path: authFile[UserRoles.CUSTOMER] });
});