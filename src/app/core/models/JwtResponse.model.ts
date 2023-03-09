export interface JwtResponse {
    user: {
        id: string,
        name: string,
        role: string,
        status: string,
        access_token: string,
        token_expires: Date,
    }
}