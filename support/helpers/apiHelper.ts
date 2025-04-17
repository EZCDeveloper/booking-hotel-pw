import { Page } from "@playwright/test";
import { request } from '@playwright/test';
import hotelData from '../../fixtures/data/apiHotel.json';

export class ApiHelper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async createHotel(storageStatePath?: string, hotelPayload?: any) {
        // Validate storage state path
        if (!storageStatePath) {
            throw new Error('Storage state path is required for authentication');
        }

        // Validate storage state file exists
        const fs = require('fs');
        if (!fs.existsSync(storageStatePath)) {
            throw new Error(`Authentication file not found: ${storageStatePath}`);
        }

        // Allow passing custom payload, default to apiHotel.json
        const payload = hotelPayload || hotelData;

        console.log('Creating hotel with payload:', JSON.stringify(payload, null, 2));
        console.log('Using authentication file:', storageStatePath);

        // Create a request context with authentication
        const context = await request.newContext({
            storageState: storageStatePath
        });

        try {
            const response = await context.post('http://localhost:7000/api/my-hotels', {
                data: payload,
            });

            console.log('Response status:', response.status());
            const responseText = await response.text();
            console.log('Response body:', responseText);

            if (!response.ok()) {
                throw new Error(`Failed to create hotel: ${response.status()} - ${responseText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating hotel:', error);
            throw error;
        } finally {
            await context.dispose();
        }
    }

}
