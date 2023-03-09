export interface Attach
{
    id: string;
    fileName: string;
    mimetype: string,
    size: number;
    bytes: Buffer;
    createdAt: Date;
}