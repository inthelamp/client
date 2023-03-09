export interface Address
{
    id: string;
    streetNo: number;
    street1: string;
    street2?: string;    
    city: string;
    province: string;
    country: string;
    postCode: string;
    createdAt: Date;
}