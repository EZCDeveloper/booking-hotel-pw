# ✨ Advanced Testing Artifacts Generator ✨

## ⚠️ Critical Application/Module Information (MERN Booking App) ⚠️

*   📝 **Application/Module Name:** MERN Booking App

*   🚀 **Main Features:**
    *   User Registration
    *   User Login & Logout
    *   User Profile Viewing
    *   Hotel Search (by destination, dates, number of guests)
    *   Hotel Filtering (by facilities, hotel types, star rating, max price)
    *   Hotel Sorting (by price, ratings, etc.)
    *   View Hotel Details (including images, description, facilities, price per night)
    *   Book Hotel (select dates, number of guests)
    *   Online Payment for Bookings (via Stripe)
    *   View Own Bookings
    *   **For Hotel Owners/Admins:**
        *   Add New Hotel (including name, location, description, type, guest capacity, facilities, price, star rating, image uploads)
        *   View Own Hotels
        *   Edit Own Hotel Details (including updating images)
        *   View Bookings for their hotels (implicitly, as bookings are linked to hotels)

*   🚶‍♂️ **Key User Flows:**
    1.  **New User Registration & Login:**
        *   Navigate to Register page -> Fill registration form (First Name, Last Name, Email, Password) -> Submit -> (Automatic Login or Navigate to Login) -> Fill login form (Email, Password) -> Submit -> Access authenticated features.
    2.  **Hotel Search & Booking (Registered User):**
        *   Login -> (Homepage or Search Page) -> Enter search criteria (destination, check-in/out dates, adults, children) -> Apply filters (facilities, type, stars, price) -> Sort results -> Select a hotel from search results -> View hotel details -> Click "Book Now" -> Confirm booking details -> Proceed to payment (Stripe) -> Complete payment -> View booking confirmation -> View in "My Bookings".
    3.  **Hotel Management (Hotel Owner/Admin User):**
        *   Login -> Navigate to "My Hotels" ->
            *   **Add Hotel:** Click "Add Hotel" -> Fill hotel details form (name, city, country, description, type, counts, facilities, price, star rating) -> Upload hotel images -> Submit.
            *   **Edit Hotel:** Select an existing hotel -> Click "Edit" -> Modify hotel details and/or upload new/replace images -> Submit.
            *   **View Hotels:** See a list of their added hotels.
    4.  **View My Bookings (Registered User):**
        *   Login -> Navigate to "My Bookings" -> View a list of past and upcoming bookings with hotel details.

*   🧑‍💼 **User Roles (if applicable):**
    *   **Registered User/Customer:** Can search, view, and book hotels. Can manage their own profile and view their bookings.
    *   **Hotel Owner/Admin:** A registered user who can also list, manage (add/edit/view) their own hotels. They can likely see bookings made for their properties.
    *   **Guest User (Unauthenticated):** Can search and view hotels. Must register or log in to make a booking or manage hotels.

*   💻 **Relevant Technologies:**
    *   **Frontend:**
        *   Language: TypeScript
        *   Framework/Library: React (v18)
        *   Build Tool: Vite
        *   Routing: `react-router-dom` (v6)
        *   State Management/Data Fetching: `react-query` (v3)
        *   Styling: Tailwind CSS
        *   Forms: `react-hook-form` (v7)
        *   Date Picker: `react-datepicker`
        *   Icons: `react-icons`
        *   Payment Integration: Stripe (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
    *   **Backend:**
        *   Language: TypeScript
        *   Runtime: Node.js
        *   Framework: Express (v4)
        *   Database: MongoDB (with Mongoose v8 ODM)
        *   Authentication: JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`)
        *   File Uploads: Multer (for `multipart/form-data`)
        *   Cloud Storage: Cloudinary (for image hosting)
        *   Payment Integration: Stripe (`stripe` SDK)
        *   Validation: `express-validator`
        *   Environment Variables: `dotenv`
        *   CORS: `cors`
        *   Cookies: `cookie-parser`
    *   **API Type:** RESTful API
    *   **Authentication Method:** HTTP-only cookie (`auth_token`)

*   🚧 **API Endpoints:**
    *   **Auth:**
        *   `POST /api/auth/login`: User login.
        *   `POST /api/auth/logout`: User logout.
        *   `GET /api/auth/validate-token`: Validate current session token.
    *   **Users:**
        *   `POST /api/users/register`: Register a new user.
        *   `GET /api/users/me`: Get current logged-in user's profile.
    *   **Hotels (Public Access & Booking):**
        *   `GET /api/hotels/search`: Search hotels with filters (destination, adultCount, childCount, facilities, types, stars, maxPrice, sortOption, page).
        *   `GET /api/hotels`: Get all hotels (likely for general display, supports pagination implicitly via search).
        *   `GET /api/hotels/:id`: Get details of a specific hotel by its ID.
        *   `POST /api/hotels/:hotelId/bookings/payment-intent`: Create a Stripe payment intent for booking a hotel (requires authentication).
        *   `POST /api/hotels/:hotelId/bookings`: Finalize a hotel booking after successful payment (requires authentication).
    *   **My Hotels (Hotel Owner/Admin - Requires Authentication):**
        *   `POST /api/my-hotels`: Add a new hotel (expects `multipart/form-data` including `imageFiles`).
        *   `GET /api/my-hotels`: Get all hotels owned by the logged-in user.
        *   `GET /api/my-hotels/:id`: Get details of a specific hotel owned by the user, by hotel ID.
        *   `PUT /api/my-hotels/:id`: Update an existing hotel owned by the user (expects `multipart/form-data`, can include `imageFiles` for new images and `imageUrls` for existing ones).
    *   **My Bookings (Registered User - Requires Authentication):**
        *   `GET /api/my-bookings`: Get all bookings made by the logged-in user.

*   🚧 **Any specific testing requirement or known constraint:**
    *   Authentication relies on an HTTP-only cookie named `auth_token`. Test cases must handle cookie acquisition and usage.
    *   Image uploads for hotels use `multipart/form-data`. API tests for hotel creation/update need to simulate this.
    *   Stripe payment integration is a critical flow. End-to-end tests should cover the payment process, and API tests should verify payment intent creation and booking confirmation logic.
    *   The application uses `react-query` for client-side data fetching and caching, which might influence UI state and test assertions for frontend tests.
    *   Backend uses `express-validator` for input validation; API tests should include cases for valid and invalid inputs.
