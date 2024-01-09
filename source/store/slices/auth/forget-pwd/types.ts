import LOADING from '~/constants/loading';

export const name = 'Auth/ForgetPwd';

export type IForgetPwd = {
    email: string;
    code?: string;
    password?: string;
};

export type ForgetPwdState = {
    user: IForgetPwd | null;
    error?: string | null;
    isLoading: LOADING;
    isLoadingUpdate: LOADING;
};

export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const FORGET_PASSWORD_SUCCESS = 'FORGET_PASSWORD_SUCCESS';
export const FORGET_PASSWORD_ERROR = 'FORGET_PASSWORD_ERROR';

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_ERROR = 'UPDATE_PASSWORD_ERROR';

export const RESET_LOADING = 'RESET_LOADING';
