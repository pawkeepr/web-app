import type LOADING from '~/constants/loading'
import type { TypeProfile } from '~/types/profile'

export const name = 'account'

export type AccountState = {
    loading: LOADING
    success: boolean
    error: boolean
    message: string | null
}

export type AccountSignUp = {
    email: string
    password: string
    passwordConfirm: string
    termsOfUse: boolean
    privacyPolicy: boolean
    type_profile: TypeProfile
    has_profile: 'yes' | 'no'
}
