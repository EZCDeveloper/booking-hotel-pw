/*-- Test Data TEMPLATE for Use in Tests --*/

// Interface for Test Data
export interface HotelDetails {
    name: string;
    city: string;
    country: string;
    description: string;
    pricePerNight: string;
    starRating: string;
    hotelType: string;
    features: string[];
    roomCapacity: {
        adults: string;
        children: string;
    };
    imagePath: string;
}


export const HotelTestData = {
    validHotel: {
        name: 'Los Campos',
        city: 'Bariloche',
        country: 'Argentina',
        description: 'The most beautiful place to rest with our families',
        pricePerNight: '49',
        starRating: '3',
        hotelType: 'Family',
        features: ['Family Rooms', 'Free WiFi', 'Outdoor Pool'],
        roomCapacity: {
            adults: '60',
            children: '60'
        },
        imagePath: 'fixtures/images/bariloche3.jpeg'
    },
    minimalHotel: {
        name: 'Minimal Hotel',
        city: 'Buenos Aires',
        country: 'Argentina',
        description: 'A simple hotel',
        pricePerNight: '29',
        starRating: '2',
        hotelType: 'Business',
        features: [],
        roomCapacity: {
            adults: '2',
            children: '0'
        },
        imagePath: 'fixtures/images/default-hotel.jpeg'
    }
};