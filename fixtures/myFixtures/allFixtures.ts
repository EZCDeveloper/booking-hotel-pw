import { test as baseTest } from "@playwright/test";
import { BasePage } from "../../support/pages/base.page";
import { LoginPage } from "../../support/pages/login.page";

type PageFixtures = {
    basePage: BasePage;
    loginPage: LoginPage;
}

export const test = baseTest.extend<PageFixtures>({
    /*-- Pages --*/
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    /*-- API --*/

})
