import { Page } from "@playwright/test";
import { request } from '@playwright/test';
import hotelData from '../../fixtures/data/apiHotel.json';

export class ApiHelper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async createHotel(storageStatePath?: string, hotelPayload?: any) {
        // Allow passing custom payload, default to apiHotel.json
        const payload = hotelPayload || hotelData;
        // Create a request context with authentication
        const context = await request.newContext({
            storageState: storageStatePath
        });
        const response = await context.post('http://localhost:7000/api/my-hotels', {
            data: payload,
        });
        if (!response.ok()) {
            throw new Error(`Failed to create hotel: ${response.status()} ${await response.text()}`);
        }
        const data = await response.json();
        await context.dispose();
        return data;
    }

}
