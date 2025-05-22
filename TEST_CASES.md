# ✨ Test Cases for MERN Booking App ✨

This document outlines test cases for the MERN Booking App, covering UI and API testing scenarios based on the application's features and technical specifications.

## Critical Priority Test Cases

### TC-001
- **Title:** Successful User Registration
- **Description:** Verify that a new user can successfully register an account. (Approach: Hybrid - UI for form interaction and initial validation, API for direct endpoint testing and comprehensive validation of backend logic and data persistence.)
- **Priority:** Critical
- **Preconditions:**
    - User is not registered with the provided email.
    - Application registration page is accessible.
- **Steps:**
    1.  **UI:** Navigate to the registration page.
    2.  **UI:** Fill in all required fields (First Name, Last Name, Email, Password, Confirm Password) with valid, unique data.
    3.  **UI:** Submit the registration form.
    4.  **UI:** Observe a success message and redirection (e.g., to login page or dashboard).
    5.  **UI:** Check if an `auth_token` cookie is set (if auto-login occurs).
    6.  **API (POST /api/users/register):**
        a. Send a POST request to `/api/users/register` with a valid and unique user registration payload (firstName, lastName, email, password).
        b. Verify the HTTP status code is 200 or 201.
        c. Verify the response body contains a success message and/or user details (excluding sensitive info like password).
        d. Verify an `auth_token` HTTP-only cookie is set in the response headers.
        e. Verify that a new user record is created in the MongoDB database with correctly hashed password.
- **Test Data:**
    - First Name: TestUserFirst
    - Last Name: TestUserLast
    - Email: `testuser_` + `timestamp()` + `@example.com`
    - Password: `ValidPassword123!`
    - Confirm Password: `ValidPassword123!`
- **Expected Result:**
    - **UI:** User is successfully registered. A confirmation message is displayed. User is redirected as expected. `auth_token` cookie might be set.
    - **API:** API returns a success status (200/201). Response body is as expected. `auth_token` cookie is set. New user record exists in DB with hashed password.

### TC-002
- **Title:** Successful User Login
- **Description:** Verify that a registered user can successfully log in with valid credentials. (Approach: Hybrid - UI for form interaction, API for direct endpoint testing.)
- **Priority:** Critical
- **Preconditions:**
    - User is registered and their account is active.
    - Application login page is accessible.
- **Steps:**
    1.  **UI:** Navigate to the login page.
    2.  **UI:** Enter valid registered email and password.
    3.  **UI:** Submit the login form.
    4.  **UI:** Observe successful login, redirection to the user dashboard or home page, and display of authenticated user elements (e.g., "My Bookings", "Sign Out").
    5.  **UI:** Verify the `auth_token` HTTP-only cookie is set in the browser.
    6.  **API (POST /api/auth/login):**
        a. Send a POST request to `/api/auth/login` with valid registered user credentials (email, password).
        b. Verify the HTTP status code is 200.
        c. Verify the response body contains user details (e.g., userId) and/or a success message.
        d. Verify an `auth_token` HTTP-only cookie is set in the response headers.
- **Test Data:**
    - Email: (Email of a pre-registered, active user)
    - Password: (Password of the pre-registered user)
- **Expected Result:**
    - **UI:** User is successfully logged in and redirected. Authenticated user elements are visible. `auth_token` cookie is set.
    - **API:** API returns a 200 status. Response body is as expected. `auth_token` cookie is set.

### TC-003
- **Title:** Hotel Search by Destination (Basic)
- **Description:** Verify that users (guest or registered) can search for hotels based on a destination. (Approach: Hybrid - UI for search interaction, API for result validation.)
- **Priority:** Critical
- **Preconditions:**
    - Hotels exist in the database for various destinations.
    - Application search interface is accessible.
- **Steps:**
    1.  **UI:** Navigate to the hotel search page (e.g., homepage).
    2.  **UI:** Enter a valid destination in the search input field.
    3.  **UI:** Optionally, select check-in/check-out dates and number of guests.
    4.  **UI:** Click the "Search" button.
    5.  **UI:** Observe that a list of hotels matching the destination is displayed. Each listing should show basic info (name, price, rating).
    6.  **API (GET /api/hotels/search):**
        a. Send a GET request to `/api/hotels/search` with a `destination` query parameter (e.g., `/api/hotels/search?destination=Bariloche`).
        b. Verify the HTTP status code is 200.
        c. Verify the response body is a JSON array of hotel objects matching the destination.
        d. Verify each hotel object contains key fields like `_id`, `name`, `city`, `country`, `pricePerNight`, `starRating`.
- **Test Data:**
    - Destination: (A city known to have multiple hotels, e.g., "Bariloche")
    - Optional: Check-in Date (future), Check-out Date (after check-in), Adults: 2
- **Expected Result:**
    - **UI:** A list of relevant hotels is displayed. If no hotels match, a "no results found" message is shown. Pagination might be present.
    - **API:** API returns a 200 status with a list of hotel objects matching the search criteria. The list can be empty if no matches.

### TC-004
- **Title:** View Hotel Details
- **Description:** Verify that users can view detailed information about a specific hotel. (Approach: Hybrid - UI for navigation, API for data accuracy.)
- **Priority:** Critical
- **Preconditions:**
    - User has a valid Hotel ID or can navigate from search results.
    - The hotel with the given ID exists.
- **Steps:**
    1.  **UI:** From the search results page, click on a hotel to view its details. (Alternatively, navigate directly via URL if structure is known: e.g., `/detail/{hotelId}`).
    2.  **UI:** Observe that the hotel details page loads, displaying comprehensive information (name, description, images, facilities, price per night, room types if applicable, map, reviews if any).
    3.  **API (GET /api/hotels/:id):**
        a. Send a GET request to `/api/hotels/{hotelId}` where `{hotelId}` is a valid ID of an existing hotel.
        b. Verify the HTTP status code is 200.
        c. Verify the response body is a JSON object containing detailed hotel information (name, description, facilities, images, pricePerNight, starRating, etc.).
        d. Compare key details from API response with UI display for consistency.
- **Test Data:**
    - Hotel ID: (A valid ID of an existing hotel)
- **Expected Result:**
    - **UI:** Hotel details page displays all relevant information accurately and comprehensively. Booking options are visible.
    - **API:** API returns a 200 status with the full details of the specified hotel, matching the database record.

### TC-005
- **Title:** Create Hotel Booking (Registered User, Successful Payment via Stripe)
- **Description:** Verify that a logged-in user can successfully book a hotel, including completing a Stripe payment. (Approach: Hybrid - UI for the end-to-end flow, API for payment intent and booking confirmation steps.)
- **Priority:** Critical
- **Preconditions:**
    - User is logged in.
    - User has selected a hotel and a valid date range with availability.
    - Valid Stripe test payment details are available.
- **Steps:**
    1.  **UI:** Navigate to the details page of the desired hotel.
    2.  **UI:** Select valid check-in/check-out dates, number of guests.
    3.  **UI:** Click the "Book Now" or "Reserve" button.
    4.  **API (POST /api/hotels/:hotelId/bookings/payment-intent):**
        a. (Triggered by UI) Verify a POST request is made to create a Stripe payment intent. Request body should include `numberOfNights`.
        b. Verify the HTTP status code is 200.
        c. Verify the response body contains `paymentIntentId` and `clientSecret` from Stripe, and `totalCost`.
    5.  **UI:** User is presented with the Stripe payment form, prefilled with amount.
    6.  **UI:** Enter valid Stripe test card details.
    7.  **UI:** Submit the payment via Stripe element.
    8.  **API (POST /api/hotels/:hotelId/bookings):**
        a. (Triggered by UI after successful Stripe client-side confirmation) Verify a POST request is made to finalize the booking. Request body must include `paymentIntentId`.
        b. Verify the HTTP status code is 200 or 201.
        c. Verify the response body contains the confirmed booking details.
        d. Verify the booking is recorded in the database for the user and hotel, including `paymentIntentId` and `totalCost`.
    9.  **UI:** User sees a booking confirmation page/message.
    10. **UI:** Navigate to "My Bookings" and verify the new booking is listed.
- **Test Data:**
    - Logged-in User: (Credentials of a registered user)
    - Hotel ID: (Valid hotel ID with availability)
    - Check-in/Check-out Dates: (Valid future dates with availability)
    - Number of Guests: (e.g., 2 adults)
    - Stripe Test Card: (e.g., `pm_card_visa` or 4242... series for success)
- **Expected Result:**
    - **UI:** User successfully completes the booking, sees a confirmation, and the booking appears in "My Bookings".
    - **API:** Payment intent is created successfully. Booking is confirmed with a 200/201 status, booking details are returned, and the booking is stored in the database. Hotel availability might be updated (if tracked).

### TC-006
- **Title:** Add New Hotel (Hotel Owner/Admin)
- **Description:** Verify that a logged-in Hotel Owner/Admin can successfully add a new hotel with all required details and image uploads. (Approach: Hybrid - UI for form interaction and file upload, API for `multipart/form-data` request validation.)
- **Priority:** Critical
- **Preconditions:**
    - User is logged in with Hotel Owner/Admin privileges.
    - User is on the "Add Hotel" page (e.g., via "My Hotels").
    - Valid image files (e.g., JPG, PNG) are available for upload.
- **Steps:**
    1.  **UI:** Navigate to the "Add Hotel" form.
    2.  **UI:** Fill in all required hotel details (name, city, country, description, type, pricePerNight, starRating, facilities, adultCount, childCount).
    3.  **UI:** Upload one or more valid hotel images using the file input.
    4.  **UI:** Submit the "Add Hotel" form.
    5.  **API (POST /api/my-hotels):**
        a. (Triggered by UI) Verify a POST request is made to `/api/my-hotels` with `Content-Type: multipart/form-data`.
        b. Verify the request payload contains all form fields and `imageFiles`.
        c. Verify the HTTP status code is 201 (Created).
        d. Verify the response body contains the details of the newly created hotel, including Cloudinary image URLs.
        e. Verify the new hotel record is created in the database, associated with the logged-in user.
        f. Verify images are uploaded to Cloudinary.
    6.  **UI:** Observe a success message and redirection (e.g., to "My Hotels" list or the new hotel's detail page).
    7.  **UI:** Verify the newly added hotel is listed in "My Hotels".
- **Test Data:**
    - Hotel Name: `Test Hotel ` + `timestamp()`
    - City: TestCity, Country: TestCountry
    - Description: A nice test hotel.
    - Type: Budget, Facilities: ["WiFi", "Parking"], Star Rating: 3
    - Price Per Night: 50, Adult Count: 2, Child Count: 1
    - Image Files: 1-5 valid image files (e.g., .jpg, .png)
- **Expected Result:**
    - **UI:** Hotel is successfully added. User is redirected. New hotel appears in "My Hotels" with correct details and images.
    - **API:** API returns 201. New hotel record created in DB. Images uploaded to Cloudinary and URLs stored.

## High Priority Test Cases

### TC-007
- **Title:** User Registration - Attempt with Existing Email
- **Description:** Verify system prevents registration with an email that already exists. (Approach: Hybrid - UI for error display, API for error response.)
- **Priority:** High
- **Preconditions:**
    - An email address is already registered in the system.
- **Steps:**
    1.  **UI:** Navigate to registration page.
    2.  **UI:** Fill form using an existing email. Other fields valid.
    3.  **UI:** Submit form. Observe error message (e.g., "Email already exists").
    4.  **API (POST /api/users/register):**
        a. Send POST request to `/api/users/register` with an existing email.
        b. Verify HTTP status code is 400 or 409 (Conflict).
        c. Verify response body contains an error message about email duplication.
- **Test Data:**
    - Email: (Email of a pre-registered user)
    - Other fields: Valid data.
- **Expected Result:**
    - **UI:** Registration fails. Appropriate error message displayed. No new user created.
    - **API:** Returns error status (400/409) with specific error message. No new user in DB.

### TC-008
- **Title:** User Login - Attempt with Invalid Credentials
- **Description:** Verify login fails with incorrect email or password. (Approach: Hybrid - UI for error display, API for error response.)
- **Priority:** High
- **Preconditions:**
    - User account exists.
- **Steps:**
    1.  **UI:** Navigate to login page.
    2.  **UI:** Enter registered email but incorrect password (or vice-versa).
    3.  **UI:** Submit form. Observe error message (e.g., "Invalid credentials").
    4.  **API (POST /api/auth/login):**
        a. Send POST request to `/api/auth/login` with invalid credentials.
        b. Verify HTTP status code is 400 or 401 (Unauthorized).
        c. Verify response body contains an error message about invalid credentials.
- **Test Data:**
    - Email: (Email of a pre-registered user)
    - Password: `IncorrectPassword123`
- **Expected Result:**
    - **UI:** Login fails. Appropriate error message displayed. No `auth_token` set.
    - **API:** Returns error status (400/401) with specific error message. No `auth_token` set.

### TC-009
- **Title:** Hotel Search with Multiple Filters and Sorting
- **Description:** Verify users can search hotels using various filters (facilities, type, stars, price) and sort results. (Approach: Hybrid - UI for filter/sort selection, API for result validation.)
- **Priority:** High
- **Preconditions:**
    - Hotels with diverse attributes exist.
- **Steps:**
    1.  **UI:** Navigate to search page.
    2.  **UI:** Enter destination. Apply multiple filters (e.g., 5-star, "WiFi", max price $200).
    3.  **UI:** Select a sort option (e.g., "Price: Low to High").
    4.  **UI:** Observe updated hotel list matching all criteria and sorted correctly.
    5.  **API (GET /api/hotels/search):**
        a. Send GET request to `/api/hotels/search` with query parameters for destination, facilities, types, stars, maxPrice, sortOption, page.
        b. Verify HTTP status code is 200.
        c. Verify response hotels match all filters and are sorted as specified.
- **Test Data:**
    - Destination: (City with diverse hotels)
    - Filters: stars=5, facilities=WiFi, maxPrice=200
    - SortOption: pricePerNightAsc
- **Expected Result:**
    - **UI:** Hotel list updates correctly. Results match filters and sorting.
    - **API:** Returns 200. Hotel list matches all criteria and sorting.

### TC-010
- **Title:** View "My Bookings" (Registered User)
- **Description:** Verify a logged-in user can view their bookings. (Approach: Hybrid - UI for display, API for data retrieval and auth.)
- **Priority:** High
- **Preconditions:**
    - User is logged in and has existing bookings.
- **Steps:**
    1.  **UI:** Log in. Navigate to "My Bookings" page.
    2.  **UI:** Observe list of user's bookings with key details (hotel name, dates, price).
    3.  **API (GET /api/my-bookings):**
        a. Send GET request to `/api/my-bookings` (with `auth_token` cookie).
        b. Verify HTTP status code is 200.
        c. Verify response is a JSON array of bookings belonging to the user.
- **Test Data:**
    - Logged-in User: (User with previous bookings)
- **Expected Result:**
    - **UI:** "My Bookings" page displays user's bookings accurately.
    - **API:** Returns 200 with list of user's bookings. Empty list if no bookings.

### TC-011
- **Title:** Edit Existing Hotel (Hotel Owner/Admin)
- **Description:** Verify a Hotel Owner/Admin can edit their hotel's details, including updating images. (Approach: Hybrid - UI for form interaction, API for `multipart/form-data` and data update.)
- **Priority:** High
- **Preconditions:**
    - User is logged in as Hotel Owner/Admin.
    - User owns at least one hotel.
    - Valid image files for update are available.
- **Steps:**
    1.  **UI:** Navigate to "My Hotels". Select a hotel and click "Edit".
    2.  **UI:** Modify some details (e.g., description, price).
    3.  **UI:** Optionally, upload new images or mark existing ones for deletion (if supported).
    4.  **UI:** Submit the edit form.
    5.  **API (PUT /api/my-hotels/:id):**
        a. (Triggered by UI) Verify PUT request to `/api/my-hotels/{hotelId}` with `Content-Type: multipart/form-data`.
        b. Payload includes updated fields, `imageUrls` (for existing images to keep), and potentially new `imageFiles`.
        c. Verify HTTP status code is 200 or 201.
        d. Verify response contains updated hotel details, including new/updated Cloudinary image URLs.
        e. Verify hotel record in DB is updated. Old images (if replaced) are handled (e.g., deleted from Cloudinary if logic exists).
    6.  **UI:** Observe success message. Hotel details (on list or detail page) reflect changes.
- **Test Data:**
    - Hotel ID: (ID of a hotel owned by the logged-in admin)
    - Updated Description: "Newly renovated test hotel."
    - Updated Price: 60
    - New Image Files: 1-2 new valid image files.
- **Expected Result:**
    - **UI:** Hotel details are updated successfully. New images appear.
    - **API:** Returns 200/201. Hotel record in DB and images on Cloudinary are updated.

### TC-012
- **Title:** API - Access Secure Endpoints Without Authentication
- **Description:** Verify secure API endpoints (e.g., /api/my-bookings, /api/my-hotels) return 401 if no `auth_token` is provided. (Approach: API only.)
- **Priority:** High
- **Preconditions:** None (beyond endpoint existence).
- **Steps:**
    1.  **API:** Send GET request to `/api/my-bookings` without `auth_token` cookie.
    2.  **API:** Verify HTTP status code is 401 (Unauthorized).
    3.  **API:** Verify response body indicates authentication is required.
    4.  **API:** Repeat for other secure endpoints like `POST /api/my-hotels`, `GET /api/users/me`.
- **Test Data:**
    - Endpoints: `/api/my-bookings`, `/api/my-hotels`, `/api/users/me`
- **Expected Result:**
    - **API:** All attempts return 401 Unauthorized with an appropriate error message. No data leakage.

## Medium Priority Test Cases

### TC-013
- **Title:** User Registration - Invalid Input Data (Format, Strength)
- **Description:** Verify system handles invalid input formats (e.g., invalid email, weak password, mismatched passwords) during registration, leveraging `express-validator`. (Approach: Hybrid - UI for field errors, API for 400 responses.)
- **Priority:** Medium
- **Preconditions:** User on registration page.
- **Steps:**
    1.  **UI/API:** Attempt registration with various invalid inputs:
        a. Invalid email format (e.g., `test.com`).
        b. Password too short (if rules apply, e.g., < 6 chars).
        c. Passwords do not match.
    2.  **UI:** Observe field-specific error messages. Registration fails.
    3.  **API (POST /api/users/register):**
        a. Send POST requests with respective invalid payloads.
        b. Verify HTTP status code is 400 (Bad Request).
        c. Verify response body contains specific error messages from `express-validator` for each invalid field.
- **Test Data:**
    - Invalid Email: `testuser.com`
    - Weak Password: `123`
    - Mismatched Passwords: Pwd1: `Pass123!`, Pwd2: `Pass456!`
- **Expected Result:**
    - **UI:** Error messages displayed. Registration blocked.
    - **API:** Returns 400 with detailed validation errors.

### TC-014
- **Title:** Hotel Search - No Results Found
- **Description:** Verify system behavior when a hotel search yields no results. (Approach: Hybrid - UI for message display, API for empty array response.)
- **Priority:** Medium
- **Steps:**
    1.  **UI:** Search with criteria unlikely to match (e.g., obscure destination, extreme filters).
    2.  **UI:** Observe "No hotels found" message.
    3.  **API (GET /api/hotels/search):**
        a. Send GET request with criteria expected to yield no results.
        b. Verify HTTP status code is 200.
        c. Verify response body is an empty JSON array `[]` or contains a `data: []` structure with pagination info.
- **Test Data:**
    - Destination: `XyzAbc123NonExistentCity`
    - Filters: (Highly restrictive, e.g., 1-star, facility " inexistente")
- **Expected Result:**
    - **UI:** Clear message indicates no matching hotels.
    - **API:** Returns 200 with an empty list of hotels.

### TC-015
- **Title:** Create Hotel Booking - Payment Failure (Stripe Test Card for Failure)
- **Description:** Verify system behavior when Stripe payment fails during booking. (Approach: Hybrid - UI for error flow, API for booking non-creation.)
- **Priority:** Medium
- **Preconditions:**
    - User logged in, attempting to book.
    - Use Stripe test card that simulates payment failure.
- **Steps:**
    1.  **UI:** Follow booking steps until Stripe payment.
    2.  **UI:** Enter Stripe test card details designed to fail (e.g., card declined).
    3.  **UI:** Submit payment. Observe error message from Stripe/application indicating payment failure.
    4.  **UI:** Booking should not be confirmed. User should be able to retry or cancel.
    5.  **API (POST /api/hotels/:hotelId/bookings):**
        a. Verify this endpoint is NOT called if Stripe fails client-side, OR if called, it doesn't create a booking due to invalid/failed `paymentIntentId`.
        b. Verify no booking record is created in the database for this attempt.
    6.  **UI:** Check "My Bookings"; the failed booking should not appear.
- **Test Data:**
    - Stripe Test Card: (A card number known to cause failures, e.g., `pm_card_visa_chargeDeclined`)
- **Expected Result:**
    - **UI:** Payment failure message displayed. Booking not completed. No charge made.
    - **API:** Booking is not created in the database. Payment intent status reflects failure.

### TC-016
- **Title:** User Logout
- **Description:** Verify a logged-in user can successfully log out. (Approach: Hybrid - UI for action, API for session termination.)
- **Priority:** Medium
- **Preconditions:** User is logged in.
- **Steps:**
    1.  **UI:** Click "Sign Out" button.
    2.  **UI:** Observe redirection to login page or homepage (guest view). Authenticated elements disappear.
    3.  **API (POST /api/auth/logout):**
        a. (Triggered by UI) Verify POST request to `/api/auth/logout`.
        b. Verify HTTP status code is 200 or 204.
        c. Verify `auth_token` cookie is cleared/invalidated (e.g., `Max-Age=0`).
    4.  **UI/API:** Attempt to access a protected page/endpoint (e.g., "My Bookings" or `/api/users/me`). Access should be denied (UI redirect, API 401).
- **Expected Result:**
    - **UI:** User logged out, redirected. Session-specific info cleared.
    - **API:** Logout endpoint succeeds. `auth_token` cleared. Protected routes inaccessible.

### TC-017
- **Title:** API - Validate Input for Hotel Creation/Update (express-validator)
- **Description:** Verify backend validation for `POST /api/my-hotels` and `PUT /api/my-hotels/:id` for missing or invalid fields. (Approach: API only.)
- **Priority:** Medium
- **Preconditions:** User authenticated with admin/owner rights.
- **Steps:**
    1.  **API:** Send `POST /api/my-hotels` request with `auth_token` but missing required fields (e.g., `name`, `city`, `pricePerNight`).
    2.  **API:** Verify HTTP status code is 400.
    3.  **API:** Verify response body contains specific error messages from `express-validator` for each missing/invalid field.
    4.  **API:** Repeat for invalid data types (e.g., `pricePerNight` as string, `starRating` > 5).
    5.  **API:** Repeat for `PUT /api/my-hotels/:id` with an existing hotel ID.
- **Test Data:**
    - Payload for POST: `{ "city": "TestCity", "country": "TestCountry" }` (missing name, etc.)
    - Payload for PUT: `{ "pricePerNight": "not-a-number" }`
- **Expected Result:**
    - **API:** All attempts return 400 with detailed validation error messages. No hotel created/updated with invalid data.

## Low Priority Test Cases

### TC-018
- **Title:** UI - Form Field Required Indicators and Basic Client-Side Validation
- **Description:** Verify required fields in forms (Registration, Login, Add/Edit Hotel) are visually indicated (e.g., asterisk) and have basic client-side checks (e.g., `react-hook-form` messages). (Approach: UI only.)
- **Priority:** Low
- **Preconditions:** User on a page with a form.
- **Steps:**
    1.  **UI:** Navigate to Registration form.
    2.  **UI:** Verify required fields (First Name, Email, Password) have visual indicators (e.g., `*`).
    3.  **UI:** Attempt to submit form with a required field empty. Observe client-side error message from `react-hook-form` near the field.
    4.  **UI:** Repeat for Add Hotel form.
- **Expected Result:**
    - **UI:** Required fields are marked. Client-side validation messages appear for empty required fields before backend submission attempt.

### TC-019
- **Title:** API - Validate Token Endpoint
- **Description:** Verify `GET /api/auth/validate-token` endpoint correctly validates or invalidates a session. (Approach: API only.)
- **Priority:** Low
- **Steps:**
    1.  **API:** Perform a successful login to obtain a valid `auth_token` cookie.
    2.  **API:** Send GET request to `/api/auth/validate-token` with the valid `auth_token` cookie.
    3.  **API:** Verify HTTP status code is 200 and response body contains user ID (`userId`).
    4.  **API:** Send GET request to `/api/auth/validate-token` without any cookie or with an invalid/expired cookie.
    5.  **API:** Verify HTTP status code is 401.
- **Expected Result:**
    - **API:** Endpoint returns 200 with `userId` for valid token, 401 for invalid/missing token.

### TC-020
- **Title:** Pagination in Hotel Search Results
- **Description:** Verify pagination works correctly if hotel search results exceed one page. (Approach: Hybrid - UI for navigation, API for `page` parameter.)
- **Priority:** Low
- **Preconditions:** Enough hotels exist to trigger pagination for a common search.
- **Steps:**
    1.  **UI:** Perform a broad search that yields many results.
    2.  **UI:** If pagination controls (e.g., page numbers, Next/Prev buttons) appear, click to navigate to page 2.
    3.  **UI:** Observe that a new set of results is displayed.
    4.  **API (GET /api/hotels/search):**
        a. Send GET request with `page=1` (or default).
        b. Send GET request with `page=2`.
        c. Verify HTTP status code is 200 for both.
        d. Verify the hotel lists are different and the response includes pagination info (e.g., `totalPages`, `currentPage`).
- **Test Data:**
    - Search: (A broad search, e.g., by a large country if data allows, or no specific destination if API supports returning all with pagination)
- **Expected Result:**
    - **UI:** Pagination controls work. Different results shown on different pages.
    - **API:** `page` parameter correctly fetches different sets of data. Pagination metadata is accurate.
