import * as Auth from 'aws-amplify/auth'
import type { AccountSignUp } from '~/store/slices/auth/register/types'
import type { On_Off } from '~/types/pet-v2'
import type { AttrTypeProfile } from '~/types/profile'
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

export type SignInResponse = {
    'custom:has_profile': On_Off
    'custom:type_profile': AttrTypeProfile
    email: string
    email_verified: 'true' | 'false'
    sub: string
} & Auth.AuthSession

// Login Method
export const signInAws = async (
    data: SignInCredentials,
): Promise<SignInResponse> => {
    try {
        await Auth.signIn({
            username: data.username,
            password: data.password,
        })
        const attr = await Auth.fetchUserAttributes()
        const credentials = await Auth.fetchAuthSession()
        return {
            ...attr,
            ...credentials,
        } as SignInResponse
    } catch (error) {
        console.error('signInAws', error)
        throw error
    }
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
    return await Auth.resetPassword({
        username: email,
    })
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
