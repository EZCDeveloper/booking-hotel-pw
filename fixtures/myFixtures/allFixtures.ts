import { test as baseTest } from "@playwright/test";
import { TestDataGenerator } from "../../support/helpers/testDataGenerator";
import { BasePage } from "../../support/pages/base/base.page";
import { LoginPage } from "../../support/pages/authentication/login.page";


type PageFixtures = {
    basePage: BasePage;
    loginPage: LoginPage;

}

export type TestDataFixtures = {
    testDataGenerator: TestDataGenerator;
}


export const test = baseTest.extend<TestDataFixtures & PageFixtures>({
    /*-- Page Fixtures --*/
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },


    /*-- API Fixtures --*/


    /* Data Generator Fixtures */
    testDataGenerator: async ({ page }, use) => {
        await use(new TestDataGenerator());
    }
});