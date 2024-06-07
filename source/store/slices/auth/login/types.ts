import type { LOADING } from '~/constants/loading'
import type { On_Off } from '~/types/pet-v2'
import type { DTOProfile, TypeProfile } from '~/types/profile'

export const name = 'Auth/Login'

type CognitoProfile = {
    'custom:type_profile'?: TypeProfile
    'custom:has_profile'?: On_Off
} & DTOProfile

export type LoginState = {
    user: CognitoProfile | null
    isAuthenticated: boolean
    rememberMe: boolean
    token: string
    error?: string | null
    isLoading: LOADING
    username: string
    password: string
}
