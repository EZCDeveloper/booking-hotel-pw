export const generateRandomEmail = (): string => {
  const timestamp = new Date().getTime();
  return `testuser_${timestamp}@example.com`;
};

export const validUser = {
  firstName: 'TestUserFirst',
  lastName: 'TestUserLast',
  email: 'testuserV5@example.com',
  password: 'ValidPassword123!',
};
