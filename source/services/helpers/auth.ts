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
            ...rest
        }
    });
}

// Login Method
export const signInAws = async (data: SignInCredentials): Promise<UserData> => {
    return Auth.signIn(data.username, data.password)
};

export const signOut = async () => {
    return Auth.signOut()
}

export async function getUser(): Promise<CognitoUserSession> {
    return Auth.currentSession();
}

export async function forgetPwd(email: string) {
    return Auth.forgotPassword(email);
}

export type {
    UserData
};
