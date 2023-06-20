import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';

import { AccountSignUp } from '~/store/auth/register/types';
import { UserData } from './types';

export type SignInCredentials = {
    username: string;
    password: string;
}

export async function resendConfirmationCode(username: string) {
    return Auth.resendSignUp(username);
}

export const singUpAws = async (data: AccountSignUp) => {
    const { email, password, ...rest } = data
    return await Auth.signUp({
        username: email,
        password,
        attributes: {
            email,
        }
    });
}

// Login Method
export const signInAws = async (data: SignInCredentials): Promise<UserData> => {
    return Auth.signIn(data.username, data.password)
};

export const confirmSignUp = async (username: string, code: string) => {
    Auth.confirmSignIn
    return Auth.confirmSignUp(username, code)
}

export const signOut = async () => {
    return Auth.signOut()
}

export async function getUser(): Promise<CognitoUserSession> {
    return Auth.currentSession();
}

export async function forgetPwd(email: string) {
    return Auth.forgotPassword(email);
}

export async function forgotPasswordSubmit(email: string, code: string, newPassword: string) {
    return Auth.forgotPasswordSubmit(email, code, newPassword)
}

export type {
    UserData
};
