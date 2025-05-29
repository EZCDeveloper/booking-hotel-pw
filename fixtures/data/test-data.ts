// This file contains test data used across various test suites.
// It helps in centralizing data management and making tests cleaner.

// Interface for User data
// Note: Adjust properties as per your application's user model
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string; // Password is required for authentication actions
    // confirmPassword is not part of the general User model, handled in specific contexts
}

export const validUser: User = {
  email: process.env.ADMIN_USERNAME || "testuser@example.com",
  password: process.env.ADMIN_PASSWORD || "password123",
  firstName: "Test",
  lastName: "User",
};

// newUser is specifically for registration tests and includes confirmPassword.
// Its type is inferred to include all its properties.
export const newUser = {
  firstName: "AutoTest",
  lastName: "User",
  // Generate a somewhat unique email using a timestamp to avoid conflicts on re-runs
  email: `autotestuser_${Date.now()}@example.com`,
  password: "Password123!",
  confirmPassword: "Password123!", // Essential for registration data
};

export const invalidUser: User = {
  firstName: "Invalid",
  lastName: "User",
  email: "invaliduser@example.com",
  password: "wrongpassword",
};

// --- Data for Registration Validation Test Cases (TC-1.1.03) ---

interface RegistrationTestCaseData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string; // All current validation cases provide this
}

export interface RegistrationValidationTestCase {
  description: string;
  data: RegistrationTestCaseData;
  expectedError: RegExp;
  isNativeHTML5Validation: boolean;
}

// Base data for new user, leveraging the existing newUser for dynamic email
const baseDataForRegistrationValidations: RegistrationTestCaseData = {
  firstName: newUser.firstName,
  lastName: newUser.lastName,
  email: newUser.email, 
  password: newUser.password,
  confirmPassword: newUser.password, // Default to matching password
};

export const registrationValidationTestCases: RegistrationValidationTestCase[] = [
  {
    description: "empty first name",
    data: { ...baseDataForRegistrationValidations, firstName: "" },
    expectedError: /This field is required/i,
    isNativeHTML5Validation: false
  },
  {
    description: "empty last name",
    data: { ...baseDataForRegistrationValidations, lastName: "" },
    expectedError: /This field is required/i,
    isNativeHTML5Validation: false
  },
  {
    description: "invalid email format",
    data: { ...baseDataForRegistrationValidations, email: "invalid-email-format" },
    expectedError: /Please include an '@' in the email address/i,
    isNativeHTML5Validation: true
  },
  {
    description: "password too short (e.g., < 6 chars)",
    data: { ...baseDataForRegistrationValidations, password: "123", confirmPassword: "123" },
    expectedError: /Password must be at least 6 characters/i,
    isNativeHTML5Validation: false
  },
  {
    description: "mismatched passwords",
    data: { ...baseDataForRegistrationValidations, confirmPassword: "anotherPassword123!" },
    expectedError: /Your passwords do no match/i, 
    isNativeHTML5Validation: false
  },
  {
    description: "empty confirm password",
    data: { ...baseDataForRegistrationValidations, confirmPassword: "" },
    expectedError: /This field is required/i, 
    isNativeHTML5Validation: false
  },
];

// Add other test data as needed, for example for hotel creation
export const hotelTestData = {
  // ...
};
