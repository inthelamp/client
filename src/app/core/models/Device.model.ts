export interface Device
{
    id: string;
    name: string;
    operatingSystem: string;
    userId: string;
    createdAt: Date;
}

export interface Server extends Device
{

}

export interface Client extends Device
{
    serverId: string;
}