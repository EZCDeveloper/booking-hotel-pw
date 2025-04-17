import { Locator, Page } from "@playwright/test";

export class MyHotelsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private hotelCards(): Locator {
        return this.page.getByTestId('hotel-card')
    }

    async selectHotelByName(hotelName: string): Promise<Locator> {
        return this.hotelCards()
            .filter(async (hotel) => {
                const texto = await hotel.textContent()
                return texto?.includes(hotelName)
            })
            .first()
    }

    async watchHotelDetails(hotelName: string): Promise<void> {
        const hotelCard = await this.selectHotelByName(hotelName)
        await hotelCard.getByRole('link', { name: 'View Details' }).click()
    }
}