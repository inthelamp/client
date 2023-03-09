export enum Role 
{
    Admin = "Admin",
    Client = "Client",    
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
    role?: Role;
    createdAt?: Date;
}