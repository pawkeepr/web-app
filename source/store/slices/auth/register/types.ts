import type LOADING from '~/constants/loading'
import type { TypeProfile } from '~/types/profile'

export const name = 'account'

export type AccountState = {
    loading: LOADING
    success: boolean
    typeProfile: TypeProfile | null
    error: boolean
    message: string | null
}

export type AccountSignUp = {
    email: string
    password: string
    passwordConfirm: string
    termsOfUse: boolean
    privacyPolicy: boolean
}
