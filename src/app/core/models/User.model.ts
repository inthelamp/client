export enum Roles 
{
    ADMIN = "Admin",
    USER = "User",    
}

export interface User
{
    id?: string;
    email: string;
    name: string;    
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
    addressId?: string; 
    role?: Roles;
    createdAt?: Date;
}