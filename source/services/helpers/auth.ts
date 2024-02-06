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
    const { email, password, type_profile, ..._ } = data
    return await Auth.signUp({
        username: email,
        password,
        attributes: {
            email,
            'custom:type_profile': `${type_profile}`,
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

export type { UserData }
