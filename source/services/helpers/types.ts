interface Payload {
    sub: string
    email_verified: boolean
    iss: string
    'cognito:username': string
    origin_jti: string
    aud: string
    event_id: string
    token_use: string
    auth_time: number
    exp: number
    iat: number
    jti: string
    email: string
}

interface Token {
    jwtToken: string
    payload: Payload
}

interface SignInUserSession {
    idToken: Token
    refreshToken: Token
    accessToken: Token
}

export interface UserData {
    username: string
    Session: any
    atributtes: {
        email: string
        email_verified: boolean
    }
    signInUserSession: SignInUserSession
}

// Example usage:
