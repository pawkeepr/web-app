import type { CognitoUserSession } from 'amazon-cognito-identity-js'
import { Auth } from 'aws-amplify'

import type { AccountSignUp } from '~/store/slices/auth/register/types'
import type { UserData } from './types'

export type SignInCredentials = {
    username: string
    password: string
}

export async function resendConfirmationCode(username: string) {
    return await Auth.resendSignUp(username)
}

export const singUpAws = async (data: AccountSignUp) => {
    const { email, password, type_profile, has_profile, ..._ } = data
    return await Auth.signUp({
        username: email,
        password,
        attributes: {
            email,
            'custom:type_profile': `${type_profile}`,
            'custom:has_profile': has_profile,
        },
    })
}

// Login Method
export const signInAws = async (data: SignInCredentials): Promise<UserData> => {
    return await Auth.signIn(data.username, data.password)
}

export const confirmSignUp = async (username: string, code: string) => {
    return await Auth.confirmSignUp(username, code)
}

export const signOut = async () => {
    return await Auth.signOut()
}

export async function getUser(): Promise<CognitoUserSession> {
    return await Auth.currentSession()
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

export async function getCurrentUser(): Promise<CurrentUserCognito> {
    return await Auth.currentAuthenticatedUser()
}

export async function forgetPwd(email: string) {
    return await Auth.forgotPassword(email)
}

export async function forgotPasswordSubmit(
    email: string,
    code: string,
    newPassword: string,
) {
    return await Auth.forgotPasswordSubmit(email, code, newPassword)
}

export async function updatePassword(oldPassword: string, newPassword: string) {
    return getCurrentUser().then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword)
    })
}

export async function updateHasProfile(has_profile: 'yes' | 'no') {
    return getCurrentUser().then((user) => {
        return Auth.updateUserAttributes(user, {
            'custom:has_profile': has_profile,
        })
    })
}

export type { UserData }
