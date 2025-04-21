// support/helpers/apiHelper.ts
import { APIRequestContext, request, expect } from '@playwright/test';

export class ApiHelper {
    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    // --- USER METHODS ---
    async registerUser(userData: any) {
        const response = await this.apiContext.post('/users/register', { data: userData });
        return response;
    }

    async loginUser(email: string, password: string) {
        const response = await this.apiContext.post('/auth/login', { data: { email, password } });
        return response;
    }

    async validateToken(authCookie: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.get('/auth/validate-token');
        await context.dispose();
        return response;
    }

    async getUserProfile(authCookie: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.get('/users/me');
        await context.dispose();
        return response;
    }

    // --- HOTEL METHODS ---
    async searchHotels(destination: string) {
        const response = await this.apiContext.get(`/hotels/search?destination=${destination}`);
        return response;
    }

    async getAllHotels() {
        const response = await this.apiContext.get('/hotels');
        return response;
    }

    async getMyHotels(authCookie: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.get('/my-hotels');
        await context.dispose();
        return response;
    }

    async createHotel(authCookie: string, hotelData: any) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.post('/my-hotels', { multipart: hotelData });
        await context.dispose();
        return response;
    }

    async updateHotel(authCookie: string, hotelId: string, hotelData: any) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.put(`/my-hotels/${hotelId}`, { multipart: hotelData });
        await context.dispose();
        return response;
    }

    async deleteHotel(authCookie: string, hotelId: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.delete(`/my-hotels/${hotelId}`);
        await context.dispose();
        return response;
    }

    async getMyBookings(authCookie: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.get('/my-bookings');
        await context.dispose();
        return response;
    }

    async createBooking(authCookie: string, hotelId: string, bookingData: any) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.post(`/hotels/${hotelId}/bookings`, { data: bookingData });
        await context.dispose();
        return response;
    }

    async createPaymentIntent(authCookie: string, paymentData: any) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.post('/bookings/create-payment-intent', { data: paymentData });
        await context.dispose();
        return response;
    }

    async getHotelById(authCookie: string, hotelId: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.get(`/my-hotels/${hotelId}`);
        await context.dispose();
        return response;
    }
}


