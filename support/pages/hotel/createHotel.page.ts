import { Locator, Page, expect } from "@playwright/test";
import { HotelDetails } from '../../../fixtures/data/test-data';

export class CreateHotelPage {
    private page: Page;

    // Locators
    private myHotelsLink = () => this.page.getByRole('link', { name: 'My Hotels' });
    private addHotelLink = () => this.page.getByRole('link', { name: 'Add Hotel' });
    private nameInput = () => this.page.getByRole('textbox', { name: 'Name' });
    private cityInput = () => this.page.getByRole('textbox', { name: 'City' });
    private countryInput = () => this.page.getByRole('textbox', { name: 'Country' });
    private descriptionInput = () => this.page.getByRole('textbox', { name: 'Description' });
    private pricePerNightInput = () => this.page.getByRole('spinbutton', { name: 'Price Per Night' });
    private starRatingSelect = () => this.page.getByLabel('Star RatingSelect as');
    private imageFileInput = () => this.page.locator('input[name="imageFiles"]');
    private saveButton = () => this.page.getByRole('button', { name: 'Save' });
    private hotelSavedNotification = () => this.page.locator('#root');
    private errorMessageLocator = () => this.page.locator('.error-message');

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToMyHotels(): Promise<CreateHotelPage> {
        await this.myHotelsLink().click();
        return this;
    }

    async clickAddHotel(): Promise<CreateHotelPage> {
        await this.addHotelLink().click();
        return this;
    }

    async fillBasicHotelDetails(details: HotelDetails): Promise<CreateHotelPage> {
        // Optional name input: only fill if name is truthy (not null, undefined, or empty string)
        if (details.name) {
            await this.nameInput().fill(details.name);
        }
        await this.cityInput().fill(details.city);
        await this.countryInput().fill(details.country);
        await this.descriptionInput().fill(details.description);
        await this.pricePerNightInput().fill(details.pricePerNight);
        await this.starRatingSelect().selectOption(details.starRating);
        return this;
    }

    async selectHotelType(hotelType: string): Promise<CreateHotelPage> {
        await this.page.locator('label').filter({ hasText: new RegExp(`^${hotelType}$`) }).click();
        return this;
    }

    async selectHotelFeatures(features: string[]): Promise<CreateHotelPage> {
        for (const feature of features) {
            await this.page.getByRole('checkbox', { name: feature }).check();
        }
        return this;
    }

    async setRoomCapacity(adults: string, children: string): Promise<CreateHotelPage> {
        await this.page.getByRole('spinbutton', { name: 'Adults', exact: true }).fill(adults);
        await this.page.getByRole('spinbutton', { name: 'Children', exact: true }).fill(children);
        return this;
    }

    async uploadHotelImage(imagePath: string): Promise<CreateHotelPage> {
        await this.imageFileInput().setInputFiles(imagePath);
        return this;
    }

    async saveHotel(): Promise<CreateHotelPage> {
        await this.saveButton().click();
        return this;
    }

    async verifyHotelSaved(): Promise<CreateHotelPage> {
        await expect(this.hotelSavedNotification()).toContainText('Hotel Saved!');
        return this;
    }

    async getErrorMessage(): Promise<string> {
        // Wait for the error message to be visible with a timeout
        try {
            await this.errorMessageLocator().waitFor({ state: 'visible', timeout: 5000 });
            return await this.errorMessageLocator().textContent() || '';
        } catch {
            // If no error message is found, return an empty string
            return '';
        }
    }

    async createHotel(hotelDetails: HotelDetails): Promise<CreateHotelPage> {
        await this.navigateToMyHotels()
            .then(() => this.clickAddHotel())
            .then(() => this.fillBasicHotelDetails(hotelDetails))
            .then(() => this.selectHotelType(hotelDetails.hotelType))
            .then(() => this.selectHotelFeatures(hotelDetails.features))
            .then(() => this.setRoomCapacity(
                hotelDetails.roomCapacity.adults,
                hotelDetails.roomCapacity.children
            ))
            .then(() => this.uploadHotelImage(hotelDetails.imagePath))
            .then(() => this.saveHotel())
            .then(() => this.verifyHotelSaved());

        return this;
    }

    // Gets the validation error message for the name input field
    async getNameFieldError() {
        return this.page.getByText('This field is required').first()
    }
}