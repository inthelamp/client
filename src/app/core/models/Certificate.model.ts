export enum Categories 
{
    CA = "CA", 
    Server = "Server", 
    Clients = "Clients",
}

export interface Certificate
{
    id?: string;
    varsFileId: string;
    commonName: string;
    category: Categories;
    createdAt: Date;
}