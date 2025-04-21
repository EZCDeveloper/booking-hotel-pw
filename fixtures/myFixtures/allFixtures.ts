import { test as baseTest, request } from "@playwright/test";
import { BasePage } from "../../support/pages/base.page";
import { LoginPage } from "../../support/pages/login.page";
import { CreateHotelPage } from "../../support/pages/hotel/createHotel.page";
import { ApiHelper } from "../../support/helpers/apiHelper";
import { MyHotelsPage } from "../../support/pages/hotel/myHotels.page";

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.staging' });

type PageFixtures = {
    basePage: BasePage;
    loginPage: LoginPage;
    createHotelPage: CreateHotelPage;
    myHotelsPage: MyHotelsPage;
}

export type ApiFixtures = {
    apiHelper: ApiHelper;
}

const BASE_URL_API = process.env.BASE_URL_API || 'http://localhost:7000/api';

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
    apiHelper: async ({ }, use) => {
        const apiContext = await request.newContext({ baseURL: BASE_URL_API });
        await use(new ApiHelper(apiContext));
        await apiContext.dispose();
    }
});