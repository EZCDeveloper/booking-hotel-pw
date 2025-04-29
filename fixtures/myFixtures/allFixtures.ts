import { test as baseTest, request } from "@playwright/test";
import { BasePage } from "../../support/pages/base.page";
import { LoginPage } from "../../support/pages/login.page";
import { CreateHotelPage } from "../../support/pages/hotel/createHotel.page";
import { UserApiHelper } from "../../support/helpers/userApiHelper";
import { MyHotelsPage } from "../../support/pages/hotel/myHotels.page";


type PageFixtures = {
    basePage: BasePage;
    loginPage: LoginPage;
    createHotelPage: CreateHotelPage;
    myHotelsPage: MyHotelsPage;
}

export type ApiFixtures = {
    userApiHelper: UserApiHelper;
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
    myHotelsPage: async ({ page }, use) => {
        const myHotelsPage = new MyHotelsPage(page);
        await use(myHotelsPage);
    },

    /*-- API --*/
    userApiHelper: async ({ page }, use) => {
        const apiContext = await request.newContext({ baseURL: process.env.BASE_URL_API });
        await use(new UserApiHelper(apiContext));
        await apiContext.dispose();
    }
});