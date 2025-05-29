# **✨ Test Cases for MERN Booking App ✨**

This document outlines test cases for the MERN Booking App, covering UI, API, and other testing scenarios based on the application's features and technical specifications. Test cases are grouped into logical suites.

## **1. Authentication Suite (UI/E2E Focus)**

*This suite focuses on user identity management through the User Interface: registration, login, logout.*

### **1.1 User Registration (UI)**

**TC-1.1.01. Successful User Registration (UI Flow)**

- **Description:** Verify that a new user can successfully register an account via the UI, providing all valid and required information.
- **Priority:** Critical
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:**
    - User is not registered with the provided email.
    - Application registration page is accessible.
- **Steps:**
    1. Navigate to the registration page.
    2. Fill in First Name, Last Name, Email, Password, Confirm Password fields with valid data.
    3. Click the "Create Account" button.
- **Expected Results:**
    - User is redirected to the homepage or a confirmation page.
    - A success message is displayed (e.g., "Registration successful!").
    - An authentication token is stored (e.g., in cookies or local storage).
    - User data is correctly persisted in the database.

**TC-1.1.02. User Registration Invalid with Existing Email (UI Feedback)**

- **Description:** Verify that the UI provides appropriate feedback when a user attempts to register with an email that already exists.
- **Priority:** High
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:**
    - An account with 'existing@example.com' email already exists.
    - Application registration page is accessible.
- **Steps:**
    1. Navigate to the registration page.
    2. Fill in registration form with an email that is already registered (e.g., 'existing@example.com') and other valid data.
    3. Click the "Create Account" button.
- **Expected Results:**
    - An error message is displayed on the UI (e.g., "User already exists" or "Email is already in use").
    - User remains on the registration page.
    - No new user account is created.

**TC-1.1.03. User Registration with Invalid Input (UI Validations)**

- **Description:** Verify UI validation messages for invalid inputs during registration (e.g., mismatched passwords, invalid email format, missing required fields).
- **Priority:** High
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** Application registration page is accessible.
- **Steps:** (Test various invalid inputs, e.g.)
    1. Navigate to the registration page.
    2. Attempt to submit with a missing required field (e.g., Last Name).
    3. Attempt to submit with an invalid email format.
    4. Attempt to submit with passwords that do not match.
- **Expected Results:**
    - Specific error messages are displayed below the respective invalid fields.
    - Form submission is prevented.

### **1.2 User Login (UI)**

**TC-1.2.01. Successful User Login (UI Flow)**

- **Description:** Verify that a registered user can successfully log in with valid credentials via the UI.
- **Priority:** Critical
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:**
    - User 'testuser@example.com' with password 'password123' is registered and active.
    - Application login page is accessible.
- **Steps:**
    1. Navigate to the login page.
    2. Enter valid email ('testuser@example.com') and password ('password123').
    3. Click the "Login" button.
- **Expected Results:**
    - User is redirected to the homepage or dashboard.
    - A success message is displayed (e.g., "Login Successful!").
    - An authentication token is stored.
    - UI reflects logged-in state (e.g., shows user name, logout button).

**TC-1.2.02. User Login with Invalid Credentials (UI Feedback)**

- **Description:** Verify that the UI provides appropriate feedback for login attempts with invalid credentials.
- **Priority:** High
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** Application login page is accessible.
- **Steps:**
    1. Navigate to the login page.
    2. Enter an invalid email or password.
    3. Click the "Login" button.
- **Expected Results:**
    - An error message is displayed (e.g., "Invalid credentials" or "Email or password incorrect").
    - User remains on the login page.

### **1.3 User Logout (UI)**

**TC-1.3.01. Successful User Logout (UI Flow)**

- **Description:** Verify that a logged-in user can successfully log out from the application via the UI.
- **Priority:** High
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** User is logged in.
- **Steps:**
    1. Click on the "Logout" button/link.
- **Expected Results:**
    - User is redirected to the login page or homepage (as a guest).
    - Authentication token is cleared.
    - UI reflects logged-out state (e.g., shows login/register buttons).

## **2. Hotel Management Suite (UI/E2E Focus - for Hotel Owners/Admins)**

*This suite covers functionalities related to managing hotel listings through the User Interface by users with owner/admin privileges.*

### **2.1 Add New Hotel (UI)**

**TC-2.1.01. Successfully Add New Hotel (UI Flow)**

- **Description:** Verify that a logged-in Hotel Owner/Admin can successfully add a new hotel with all required details and image uploads via the UI.
- **Priority:** Critical
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** User is logged in as a Hotel Owner/Admin.
- **Steps:** (Detailed steps for filling the 'Add Hotel' form)
- **Expected Results:** Hotel is added, success message, hotel appears in "My Hotels" list.

**TC-2.1.02. Add New Hotel with Missing Required Fields (UI Validation)**

- **Description:** Verify UI validation when attempting to add a new hotel with missing required fields.
- **Priority:** High
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** User is logged in as a Hotel Owner/Admin, on the 'Add Hotel' page.
- **Steps:** Attempt to submit the form with one or more required fields empty.
- **Expected Results:** Validation errors displayed for missing fields, form not submitted.

### **2.2 Edit Hotel (UI)**

**TC-2.2.01. Successfully Edit Existing Hotel (UI Flow)**

- **Description:** Verify that a Hotel Owner/Admin can successfully edit the details of an existing owned hotel via the UI.
- **Priority:** High
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** User is logged in as a Hotel Owner/Admin and has at least one hotel listed.
- **Steps:** (Detailed steps for navigating to edit, modifying, and saving)
- **Expected Results:** Hotel details are updated, success message, updated details reflected.

### **2.3 View My Hotels (UI)**

**TC-2.3.01. View List of Owned Hotels (UI)**

- **Description:** Verify that a Hotel Owner/Admin can view a list of their own hotels.
- **Priority:** Medium
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** User is logged in as a Hotel Owner/Admin.
- **Steps:** Navigate to the "My Hotels" section.
- **Expected Results:** A list/grid of hotels owned by the user is displayed with key information.

## **3. Hotel Discovery Suite (UI/E2E Focus - for All Users)**

*This suite focuses on searching for hotels and viewing hotel details through the User Interface, accessible to both guests and registered users.*

### **3.1 Search Hotels (UI)**

**TC-3.1.01. Basic Hotel Search by Destination (UI)**

- **Description:** Verify that users can search for hotels based on a destination via the UI.
- **Priority:** Critical
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** Hotels exist for the searched destination.
- **Steps:** Enter a destination in the search bar, click search.
- **Expected Results:** List of hotels matching the destination is displayed.

**TC-3.1.02. Hotel Search with Filters (UI)**

- **Description:** Verify hotel search functionality with various filters (e.g., date range, number of adults/children, price range, star rating, facilities) via the UI.
- **Priority:** High
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** Hotels exist that match filter criteria.
- **Steps:** Perform a search and apply various available filters.
- **Expected Results:** Search results are updated according to the applied filters.

**TC-3.1.03. Hotel Search with No Results (UI Feedback)**

- **Description:** Verify UI feedback when a hotel search yields no results.
- **Priority:** Medium
- **Type:** E2E / UI
- **Status:** Pending
- **Steps:** Perform a search with criteria that are unlikely to match any hotels.
- **Expected Results:** A message indicating "No hotels found" or similar is displayed.

### **3.2 View Hotel Details (UI)**

**TC-3.2.01. View Detailed Information of a Hotel (UI)**

- **Description:** Verify that users can click on a hotel from search results to view its detailed information page via the UI.
- **Priority:** High
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** Hotel search results are displayed.
- **Steps:** Click on a hotel listing from the search results.
- **Expected Results:** User is navigated to the hotel details page showing comprehensive information (description, images, facilities, map, price, reviews).

## **4. Booking Management Suite (UI/E2E Focus - for Registered Users)**

*This suite covers the process of booking hotels and viewing past bookings through the User Interface, for logged-in registered users.*

### **4.1 Create Hotel Booking (UI)**

**TC-4.1.01. Successful Hotel Booking (UI Flow, including payment simulation/actual)**

- **Description:** Verify that a logged-in user can successfully book a hotel, including completing a payment process, via the UI.
- **Priority:** Critical
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** User is logged in, has selected a hotel and dates.
- **Steps:** (Detailed steps for the booking and payment flow)
- **Expected Results:** Booking is confirmed, success message, booking appears in "My Bookings".

**TC-4.1.02. Attempt Booking without Being Logged In (UI Redirection/Prompt)**

- **Description:** Verify that if a guest user attempts to book a hotel, they are prompted to log in or register.
- **Priority:** Medium
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** User is not logged in.
- **Steps:** Select a hotel and attempt to proceed to booking.
- **Expected Results:** User is redirected to the login page or shown a login/register prompt.

### **4.2 View My Bookings (UI)**

**TC-4.2.01. View List of Past Bookings (UI)**

- **Description:** Verify that a logged-in user can view their list of past and upcoming bookings via the UI.
- **Priority:** High
- **Type:** E2E / UI
- **Status:** Pending
- **Preconditions:** User is logged in and has made bookings.
- **Steps:** Navigate to the "My Bookings" section.
- **Expected Results:** A list of user's bookings is displayed with relevant details.

## **5. API Test Suite**

*This suite focuses on direct API endpoint testing, covering functionality, security, and data integrity. These tests interact directly with the backend API, bypassing the UI.*

### **5.1 API - Authentication Endpoints**

**TC-5.1.01. API - Successful User Registration**

- **Description:** Verify successful user registration via the `/api/users/register` endpoint.
- **Priority:** Critical
- **Type:** API
- **Status:** Pending
- **Endpoint:** `POST /api/users/register`
- **Request Body:** `{ "firstName": "ApiTest", "lastName": "User", "email": "api.unique.user@example.com", "password": "password123" }`
- **Expected Response:** Status 200/201, JSON body with success message, user details (excluding password), and authentication token in cookie/body.

**TC-5.1.02. API - User Registration with Existing Email**

- **Description:** Verify API returns a 400 error for registration with an existing email.
- **Priority:** High
- **Type:** API
- **Status:** Pending
- **Endpoint:** `POST /api/users/register`
- **Request Body:** `{ "firstName": "ApiTest", "lastName": "User", "email": "existing.user@example.com", "password": "password123" }` (assuming 'existing.user@example.com' is already registered)
- **Expected Response:** Status 400, JSON body `{ "message": "User already exists" }`.

**TC-5.1.03. API - User Registration with Invalid Data**

- **Description:** Verify API returns a 400 error with validation messages for invalid registration data (e.g., missing fields, invalid email format).
- **Priority:** High
- **Type:** API
- **Status:** Pending
- **Endpoint:** `POST /api/users/register`
- **Request Body Examples:**
    - Missing `firstName`: `{ "lastName": "User", "email": "invalid.data@example.com", "password": "password123" }`
    - Invalid email: `{ "firstName": "ApiTest", "lastName": "User", "email": "invalid-email", "password": "password123" }`
- **Expected Response:** Status 400, JSON body with an array of error messages corresponding to validation failures.

**TC-5.1.04. API - Successful User Login**

- **Description:** Verify successful user login via the `/api/auth/login` endpoint and token issuance.
- **Priority:** Critical
- **Type:** API
- **Status:** Pending
- **Endpoint:** `POST /api/auth/login`
- **Request Body:** `{ "email": "registered.user@example.com", "password": "password123" }`
- **Expected Response:** Status 200, JSON body with success message/userId, `auth_token` cookie set.

**TC-5.1.05. API - User Login with Invalid Credentials**

- **Description:** Verify API returns a 400/401 error for login attempts with incorrect credentials.
- **Priority:** High
- **Type:** API
- **Status:** Pending
- **Endpoint:** `POST /api/auth/login`
- **Request Body:** `{ "email": "registered.user@example.com", "password": "wrongpassword" }`
- **Expected Response:** Status 400/401, JSON body with error message (e.g., "Invalid Credentials").

**TC-5.1.06. API - Validate Active Session Token**

- **Description:** Verify the `/api/auth/validate-token` endpoint correctly validates an active session token.
- **Priority:** High
- **Type:** API
- **Status:** Pending
- **Endpoint:** `GET /api/auth/validate-token`
- **Preconditions:** A valid `auth_token` cookie from a logged-in session is sent with the request.
- **Expected Response:** Status 200, JSON body with `userId`.

**TC-5.1.07. API - Successful User Logout**

- **Description:** Verify the `/api/auth/logout` endpoint successfully logs out the user and clears the token.
- **Priority:** High
- **Type:** API
- **Status:** Pending
- **Endpoint:** `POST /api/auth/logout`
- **Preconditions:** A valid `auth_token` cookie from a logged-in session is sent.
- **Expected Response:** Status 200, JSON body with success message, `auth_token` cookie is cleared/expired.

### **5.2 API - Hotel Management Endpoints (Owner/Admin - Requires Auth)**

**TC-5.2.01. API - Add New Hotel**

- **Description:** Verify successful hotel creation via `POST /api/my-hotels` by an authenticated owner.
- **Priority:** Critical
- **Type:** API
- **Status:** Pending
- **Endpoint:** `POST /api/my-hotels`
- **Preconditions:** User is authenticated as a hotel owner.
- **Request Body:** (Valid hotel data as multipart/form-data including images)
- **Expected Response:** Status 201, JSON body of the created hotel.

**TC-5.2.02. API - Get My Hotels**

- **Description:** Verify retrieval of hotels for an authenticated owner via `GET /api/my-hotels`.
- **Priority:** High
- **Type:** API
- **Status:** Pending
- **Endpoint:** `GET /api/my-hotels`
- **Preconditions:** User is authenticated as a hotel owner.
- **Expected Response:** Status 200, JSON array of hotels owned by the user.

**TC-5.2.03. API - Get Specific Owned Hotel by ID**

- **Description:** Verify retrieval of a specific hotel by ID owned by the authenticated user via `GET /api/my-hotels/:id`.
- **Priority:** High
- **Type:** API
- **Status:** Pending
- **Endpoint:** `GET /api/my-hotels/:hotelId` (replace `:hotelId` with an actual ID owned by the user)
- **Preconditions:** User is authenticated as a hotel owner.
- **Expected Response:** Status 200, JSON body of the specific hotel.

**TC-5.2.04. API - Update Owned Hotel**

- **Description:** Verify successful update of an owned hotel via `PUT /api/my-hotels/:id` by an authenticated owner.
- **Priority:** High
- **Type:** API
- **Status:** Pending
- **Endpoint:** `PUT /api/my-hotels/:hotelId` (replace `:hotelId`)
- **Preconditions:** User is authenticated as a hotel owner.
- **Request Body:** (Updated hotel data as multipart/form-data or JSON)
- **Expected Response:** Status 200/201, JSON body of the updated hotel.

### **5.3 API - Hotel Discovery Endpoints (Public/User)**

**TC-5.3.01. API - Search Hotels**

- **Description:** Verify hotel search functionality via `GET /api/hotels/search` with various query parameters (destination, dates, counts, filters).
- **Priority:** Critical
- **Type:** API
- **Status:** Pending
- **Endpoint:** `GET /api/hotels/search`
- **Query Parameters Examples:** `?destination=Paris`, `?adultCount=2&childCount=1`, `?facilities=freeWifi&sortOption=starRating`
- **Expected Response:** Status 200, JSON body with search results (hotels array, pagination info).

**TC-5.3.02. API - Get All Hotels (Listing)**

- **Description:** Verify retrieval of all available hotels via `GET /api/hotels` (supports pagination, sorting).
- **Priority:** High
- **Type:** API
- **Status:** Pending
- **Endpoint:** `GET /api/hotels`
- **Query Parameters Examples:** `?page=2`, `?sortOption=pricePerNightAsc`
- **Expected Response:** Status 200, JSON body with a list of hotels and pagination details.

**TC-5.3.03. API - Get Specific Hotel Details (Public)**

- **Description:** Verify retrieval of detailed information for a specific hotel by ID via `GET /api/hotels/:id`.
- **Priority:** High
- **Type:** API
- **Status:** Pending
- **Endpoint:** `GET /api/hotels/:hotelId` (replace `:hotelId` with an actual public hotel ID)
- **Expected Response:** Status 200, JSON body of the hotel details.

### **5.4 API - Booking Management Endpoints (Registered User - Requires Auth)**

**TC-5.4.01. API - Create Payment Intent for Booking**

- **Description:** Verify successful creation of a Stripe payment intent for a hotel booking via `POST /api/hotels/:hotelId/bookings/payment-intent`.
- **Priority:** Critical
- **Type:** API
- **Status:** Pending
- **Endpoint:** `POST /api/hotels/:hotelId/bookings/payment-intent`
- **Preconditions:** User is authenticated.
- **Request Body:** `{ "numberOfNights": 3 }` (example)
- **Expected Response:** Status 200, JSON body with `paymentIntentId` and `clientSecret`.

**TC-5.4.02. API - Create New Booking (Confirm Payment)**

- **Description:** Verify successful creation of a new booking after a payment intent via `POST /api/hotels/:hotelId/bookings`.
- **Priority:** Critical
- **Type:** API
- **Status:** Pending
- **Endpoint:** `POST /api/hotels/:hotelId/bookings`
- **Preconditions:** User is authenticated, valid `paymentIntentId` obtained.
- **Request Body:** (Details of the booking, including `paymentIntentId`)
- **Expected Response:** Status 200/201, JSON body confirming the booking.

**TC-5.4.03. API - Get My Bookings**

- **Description:** Verify retrieval of bookings for the authenticated user via `GET /api/my-bookings`.
- **Priority:** High
- **Type:** API
- **Status:** Pending
- **Endpoint:** `GET /api/my-bookings`
- **Preconditions:** User is authenticated.
- **Expected Response:** Status 200, JSON array of the user's bookings.

### **5.5 API - Security & Authorization**

**TC-5.5.01. API - Access Protected Owner Endpoint without Token**

- **Description:** Verify that attempting to access a protected owner/admin endpoint (e.g., `POST /api/my-hotels`) without an authentication token returns a 401 Unauthorized error.
- **Priority:** Critical
- **Type:** API / Security
- **Status:** Pending
- **Endpoint:** Example: `POST /api/my-hotels`
- **Preconditions:** No `auth_token` cookie or Authorization header sent.
- **Expected Response:** Status 401.

**TC-5.5.02. API - Access Protected Owner Endpoint with Invalid/Expired Token**

- **Description:** Verify that attempting to access a protected owner/admin endpoint with an invalid or expired token returns a 401 Unauthorized error.
- **Priority:** Critical
- **Type:** API / Security
- **Status:** Pending
- **Endpoint:** Example: `POST /api/my-hotels`
- **Preconditions:** An invalid/expired `auth_token` is sent.
- **Expected Response:** Status 401.

**TC-5.5.03. API - Attempt to Access Other User's Resource**

- **Description:** Verify that User A cannot access/modify resources owned by User B (e.g., User A tries to edit/view details of a hotel owned by User B via `PUT /api/my-hotels/:hotelIdOfUserB`).
- **Priority:** High
- **Type:** API / Security
- **Status:** Pending
- **Preconditions:** User A is authenticated. `:hotelIdOfUserB` belongs to User B.
- **Expected Response:** Status 403 (Forbidden) or 404 (Not Found).

**TC-5.5.04. API - Input Validation and Sanitization (Security Focus)**

- **Description:** Verify that API endpoints properly validate and sanitize inputs to prevent common vulnerabilities like SQL Injection or XSS (e.g., sending malicious strings in search parameters or form data).
- **Priority:** Critical
- **Type:** API / Security
- **Status:** Pending
- **Endpoints:** Various, especially those accepting user-generated string inputs.
- **Request Body/Query Params:** Include payloads designed to test for vulnerabilities (e.g., `' OR '1'='1`, `<script>alert('XSS')</script>`).
- **Expected Response:** Input is rejected (e.g., 400 Bad Request), or sanitized and does not cause unintended behavior/errors. No XSS execution or SQL errors.
