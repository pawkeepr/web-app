

export const name = 'account'

export type AccountState = {
    loading: boolean,
    success: boolean,
    error: boolean
    message: string | null,
}

export type AccountSignUp = {
    email: string;
    password: string;
    passwordConfirm: string;
    termsOfUse: boolean;
};