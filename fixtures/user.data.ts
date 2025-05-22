export const generateRandomEmail = (): string => {
  const timestamp = new Date().getTime();
  return `testuser_${timestamp}@example.com`;
};

export const validUser = {
  firstName: 'TestUserFirst',
  lastName: 'TestUserLast',
  password: 'ValidPassword123!',
};
