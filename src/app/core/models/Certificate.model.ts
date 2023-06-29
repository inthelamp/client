export enum Categories 
{
    CA = "CA", 
    Server = "Server", 
    Client = "Client",
}

export interface Certificate
{
    id?: string;
    commonName: string;    //CA, client, or server's name to make fully qualified name in all
    category: Categories;
    varsFileId: string;
    createdAt: Date;
}

export interface DeviceCertificate extends Certificate
{
    deviceId: string;
}