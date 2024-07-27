import type { LOADING } from '~/constants/loading'
import type { SignInResponse } from '~/services/helpers/auth'

export const name = 'Auth/Login'

export type LoginState = {
    user: SignInResponse | null
    isAuthenticated: boolean
    rememberMe: boolean
    token: string
    error?: string | null
    isLoading: LOADING
    username: string
    password: string
}
