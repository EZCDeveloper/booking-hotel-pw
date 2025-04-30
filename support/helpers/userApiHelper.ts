// support/helpers/apiHelper.ts
import { APIRequestContext, request, expect } from '@playwright/test';

export class UserApiHelper {
    constructor(private request: APIRequestContext) { }

    // --- USER METHODS ---
    async registerUser(userData: any) {
        const response = await this.request.post('/api/users/register', { data: userData });
        return response;
    }

    async loginUser(email: string, password: string) {
        const response = await this.request.post('/api/auth/login', { data: { email, password } });
        return response;
    }



    async validateToken(authCookie: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.get('/api/auth/validate-token');
        await context.dispose();
        return response;
    }

    async getUserProfile(authCookie: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.get('/api/users/me');
        await context.dispose();
        return response;
    }

    // --- HOTEL METHODS ---
    async searchHotels(destination: string) {
        const response = await this.request.get(`/api/hotels/search?destination=${destination}`);
        return response;
    }

    async getAllHotels() {
        const response = await this.request.get('/api/hotels');
        return response;
    }

    async getMyHotels(authCookie: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.get('/api/my-hotels');
        await context.dispose();
        return response;
    }

    async createHotel(authCookie: string, hotelData: any) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.post('/api/my-hotels', { data: hotelData });
        const status = response.status();
        const body = await response.text(); // O response.json() si siempre es JSON
        await context.dispose();
        return { status, body };
    }

    async updateHotel(authCookie: string, hotelId: string, hotelData: any) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.put(`/api/my-hotels/${hotelId}`, { multipart: hotelData });
        await context.dispose();
        return response;
    }

    async deleteHotel(authCookie: string, hotelId: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.delete(`/api/my-hotels/${hotelId}`);
        await context.dispose();
        return response;
    }

    async getMyBookings(authCookie: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.get('/api/my-bookings');
        await context.dispose();
        return response;
    }

    async createBooking(authCookie: string, hotelId: string, bookingData: any) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.post(`/api/hotels/${hotelId}/bookings`, { data: bookingData });
        await context.dispose();
        return response;
    }

    async createPaymentIntent(authCookie: string, paymentData: any) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.post('/api/bookings/create-payment-intent', { data: paymentData });
        await context.dispose();
        return response;
    }

    async getHotelById(authCookie: string, hotelId: string) {
        const context = await request.newContext({
            extraHTTPHeaders: { Cookie: `auth_token=${authCookie}` }
        });
        const response = await context.get(`/api/my-hotels/${hotelId}`);
        await context.dispose();
        return response;
    }
}


