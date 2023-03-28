export enum Countries 
{
    CA = "CA", 
    US = "US",
}

export interface Issuer
{
    id: string;
    country: Countries;
    province: string;
    city: string;
    organization: string;
    organizationalUnit: string;
    email: string;
    commonName: string;
}