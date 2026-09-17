export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    familyId: string;
}
export interface RefreshRequest {
    refreshToken: string;
}

export interface LogoutRequest {
    familyId: string;
}
export interface LoginPayload {
    email: string;
    password: string;
}
export interface RegisterPayload {

}