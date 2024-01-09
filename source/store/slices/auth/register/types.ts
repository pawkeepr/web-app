import LOADING from '~/constants/loading';

export const name = 'account';

export type AccountState = {
    loading: LOADING;
    success: boolean;
    error: boolean;
    message: string | null;
};

export type AccountSignUp = {
    email: string;
    password: string;
    passwordConfirm: string;
    termsOfUse: boolean;
    policyPrivacy: boolean;
};
