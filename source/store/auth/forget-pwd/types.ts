import LOADING from '~/constants/loading';

export const name = 'Auth/ForgetPwd';

export type IForgetPwd = {
    email: string,
};

export type ForgetPwdState = {
    user: IForgetPwd | null;
    error?: string | null;
    isLoading: LOADING;
}

export const FORGET_PASSWORD = "FORGET_PASSWORD"
export const FORGET_PASSWORD_SUCCESS = "FORGET_PASSWORD_SUCCESS"
export const FORGET_PASSWORD_ERROR = "FORGET_PASSWORD_ERROR"

