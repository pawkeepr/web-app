import { createAction } from '@reduxjs/toolkit';

import {
    ACTION_ACTIVATE_ACCOUNT,
    ACTION_ACTIVATE_ACCOUNT_ERROR,
    ACTION_ACTIVATE_ACCOUNT_SUCCESS,
    ACTION_RESEND_CONFIRMATION_CODE,
    ACTION_RESEND_CONFIRMATION_CODE_ERROR,
    ACTION_RESEND_CONFIRMATION_CODE_SUCCESS,
    ActivateAccount,
    RESET_PROFILE_FLAG,
} from './types';

export const activateAccount = createAction<ActivateAccount>(ACTION_ACTIVATE_ACCOUNT);
export const activateAccountSuccess = createAction<ActivateAccount>(ACTION_ACTIVATE_ACCOUNT_SUCCESS);
export const activateAccountError = createAction<ActivateAccount>(ACTION_ACTIVATE_ACCOUNT_ERROR);
export const resetProfileFlag = createAction(RESET_PROFILE_FLAG);
export const resendConfirmationCode = createAction<{ username: string }>(ACTION_RESEND_CONFIRMATION_CODE);
export const resendConfirmationCodeSuccess = createAction(ACTION_RESEND_CONFIRMATION_CODE_SUCCESS);
export const resendConfirmationCodeError = createAction(ACTION_RESEND_CONFIRMATION_CODE_ERROR);