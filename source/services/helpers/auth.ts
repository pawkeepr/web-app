import Auth from 'aws-amplify/auth'
import type { AccountSignUp } from '~/store/slices/auth/register/types'
import type { UserData } from './types'

export type SignInCredentials = {
    username: string
    password: string
}

export async function resendConfirmationCode(username: string) {
    return await Auth.resendSignUpCode({
        username,
    })
}

export const singUpAws = async (data: AccountSignUp) => {
    const { email, password, type_profile, has_profile, ..._ } = data
    return await Auth.signUp({
        username: email,
        password,
        options: {
            userAttributes: {
                email,
                'custom:type_profile': `${type_profile}`,
                'custom:has_profile': has_profile,
            },
        },
    })
}

// Login Method
export const signInAws = async (data: SignInCredentials): Promise<unknown> => {
    return await Auth.signIn({
        username: data.username,
        password: data.password,
    })
}

export const confirmSignUp = async (username: string, code: string) => {
    return await Auth.confirmSignUp({
        confirmationCode: code,
        username,
    })
}

export const signOut = async () => {
    return await Auth.signOut()
}

export async function getUser(): Promise<unknown> {
    return await Auth.fetchUserAttributes()
}

export type CurrentUserCognito = {
    [key: string]: unknown
    attributes: {
        email: string
        'custom:type_profile': '1' | '2'
        'custom:has_profile': string
        email_verified: boolean
        sub: string
    }
}

export async function getCurrentUser(): Promise<unknown> {
    return await Auth.fetchAuthSession()
}

export async function forgetPwd(email: string) {
    return
}

export async function forgotPasswordSubmit(
    email: string,
    code: string,
    newPassword: string,
) {
    return await Auth.confirmResetPassword({
        username: email,
        newPassword,
        confirmationCode: code,
    })
}

export async function updatePassword(oldPassword: string, newPassword: string) {
    return Auth.updatePassword({
        oldPassword,
        newPassword,
    })
}

export async function updateHasProfile(has_profile: 'yes' | 'no') {
    return Auth.updateUserAttributes({
        userAttributes: {
            'custom:has_profile': has_profile,
        },
    })
}

export type { UserData }
