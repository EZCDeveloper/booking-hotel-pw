import { test as baseTest } from "@playwright/test";
import { BasePage } from "../../support/pages/base.page";
import { LoginPage } from "../../support/pages/login.page";
import { CreateHotelPage } from "../../support/pages/hotel/createHotel.page";
import { ApiHelper } from "../../support/helpers/apiHelper";

type PageFixtures = {
    basePage: BasePage;
    loginPage: LoginPage;
    createHotelPage: CreateHotelPage;
}

export type ApiFixtures = {
    apiHelper: ApiHelper;
}

export const test = baseTest.extend<PageFixtures & ApiFixtures>({
    /*-- Pages --*/
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    createHotelPage: async ({ page }, use) => {
        const createHotelPage = new CreateHotelPage(page);
        await use(createHotelPage);
    },

    /*-- API --*/
    apiHelper: async ({ page }, use) => {
        await use(new ApiHelper(page));
    }
})
