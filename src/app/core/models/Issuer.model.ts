export enum Countries 
{
    CA = "CA", 
    US = "US",
}

export enum Statuses
{
    Created_Vars = "Created Vars",     //Vars file is created
    Initialized_PKI = "Initialized_PKI", //Performed init-pki
    Generated_CA = "Generated CA",         //Certificate Authority is generated 
    Generated_DH = "Generated DH",         //DH is generated
    Generated_Server = "Generated Server", //Server certificate is generated
    Generated_TA = "Generated TA", //Server certificate is generated
    Generated_Client = "Generated Client", //At least a client certificate is generated
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