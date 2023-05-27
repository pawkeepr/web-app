import LOADING from "~/constants/loading";

export const name = "activate";

export const ACTIVATE_ACCOUNT = "ACTIVATE_ACCOUNT";
export const ACTIVATE_ACCOUNT_SUCCESS = "ACTIVATE_ACCOUNT_SUCCESS";
export const ACTIVATE_ACCOUNT_ERROR = "ACTIVATE_ACCOUNT_ERROR";
export const RESET_PROFILE_FLAG = "RESET_PROFILE_FLAG";

export const ACTION_ACTIVATE_ACCOUNT = `${name}/${ACTIVATE_ACCOUNT}`;
export const ACTION_ACTIVATE_ACCOUNT_SUCCESS = `${name}/${ACTIVATE_ACCOUNT_SUCCESS}`;
export const ACTION_ACTIVATE_ACCOUNT_ERROR = `${name}/${ACTIVATE_ACCOUNT_ERROR}`;

export type ActivateAccount = {
    username: string,
    code: string
}

export type InitialStateProfile = {
    error: string;
    isLoading: LOADING;
    user: ActivateAccount | null;
}
