import { Device } from "./Device";

export interface Client extends Device
{
    serverId: string;
}