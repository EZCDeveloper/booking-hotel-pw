import path from 'path';

export enum UserRoles {
    ADMIN = 'administrator',
    CUSTOMER = 'customer',
    // Add more roles as needed
}

export interface UserCredentials {
    username: string;
    password: string;
    authFile: string;
}

export const Users: Record<UserRoles, UserCredentials> = {
    [UserRoles.ADMIN]: {
        username: process.env.ADMIN_USERNAME!,
        password: process.env.ADMIN_PASSWORD!,
        authFile: path.join(__dirname, '../../.auth/admin.json')
    },
    [UserRoles.CUSTOMER]: {
        username: process.env.CUSTOMER_USERNAME!,
        password: process.env.CUSTOMER_PASSWORD!,
        authFile: path.join(__dirname, '../../.auth/customer.json')
    }
};
