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
    attributes: {
        email: string
        email_verified: boolean
        'custom:type_profile': '1' | '2'
        'custom:has_profile': 'yes' | 'no'
    }
    signInUserSession: SignInUserSession
}

export const AttributeTypeProfile = {
    VETERINARY: '1',
    TUTOR: '2',
    NONE: null,
} as const
export type AttributeTypeProfile =
    (typeof AttributeTypeProfile)[keyof typeof AttributeTypeProfile]

export interface AttributesProfile {
    type_profile: AttributeTypeProfile
    has_profile: 'yes' | 'no'
}
// Example usage:
