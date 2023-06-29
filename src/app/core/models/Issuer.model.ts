export enum Countries 
{
    CA = "CA", 
    US = "US",
}

export enum Statuses
{
    Created_Vars = "Created_Vars",     //Vars file is created
    Initialized_PKI = "Initialized_PKI", //Performed init-pki
    Generated_CA = "Generated_CA",         //Certificate Authority is generated 
    Generated_DH = "Generated_DH",         //DH is generated
    Generated_Server = "Generated_Server", //Server certificate is generated
    Generated_TA = "Generated_TA", //Server certificate is generated
    Generated_Client = "Generated_Client", //At least a client certificate is generated
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
    status?: Statuses;
}