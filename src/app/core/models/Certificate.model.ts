export interface Certificate
{
    id: string;
    caId: string;
    commonName: string;
    expiredAt: Date;
    createdAt: Date;
}