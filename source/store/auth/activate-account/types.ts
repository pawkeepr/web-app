import LOADING from "~/constants/loading";

export const name = "activate";

export const SET_EMAIL_ACCOUNT = "SET_EMAIL_ACCOUNT";

export const ACTIVATE_ACCOUNT = "ACTIVATE_ACCOUNT";
export const ACTIVATE_ACCOUNT_SUCCESS = "ACTIVATE_ACCOUNT_SUCCESS";
export const ACTIVATE_ACCOUNT_ERROR = "ACTIVATE_ACCOUNT_ERROR";

export const RESEND_CONFIRMATION_CODE = "RESEND_CONFIRMATION_CODE";
export const RESEND_CONFIRMATION_CODE_SUCCESS = "RESEND_CONFIRMATION_CODE_SUCCESS";
export const RESEND_CONFIRMATION_CODE_ERROR = "RESEND_CONFIRMATION_CODE_ERROR";

export const RESET_PROFILE_FLAG = "RESET_PROFILE_FLAG";

export const ACTION_ACTIVATE_ACCOUNT = `${name}/${ACTIVATE_ACCOUNT}`;
export const ACTION_ACTIVATE_ACCOUNT_SUCCESS = `${name}/${ACTIVATE_ACCOUNT_SUCCESS}`;
export const ACTION_ACTIVATE_ACCOUNT_ERROR = `${name}/${ACTIVATE_ACCOUNT_ERROR}`;
export const ACTION_RESEND_CONFIRMATION_CODE = `${name}/${RESEND_CONFIRMATION_CODE}`;
export const ACTION_RESEND_CONFIRMATION_CODE_SUCCESS = `${name}/${RESEND_CONFIRMATION_CODE_SUCCESS}`;
export const ACTION_RESEND_CONFIRMATION_CODE_ERROR = `${name}/${RESEND_CONFIRMATION_CODE_ERROR}`;

export const ACTION_SET_EMAIL_ACCOUNT = `${name}/${SET_EMAIL_ACCOUNT}`;

export type ActivateAccount = {
    username: string,
    code: string
}

export type InitialStateProfile = {
    error: string;
    isLoading: LOADING;
    email: string;
    user: ActivateAccount | null;
}
