import { createAction } from '@reduxjs/toolkit';

import {
    FORGET_PASSWORD,
    FORGET_PASSWORD_ERROR,
    FORGET_PASSWORD_SUCCESS,
    IForgetPwd,
    name
} from './types';

export const ACTION_FORGET_PASSWORD = `${name}/${FORGET_PASSWORD}`;
export const ACTION_FORGET_PASSWORD_SUCCESS = `${name}/${FORGET_PASSWORD_SUCCESS}`;
export const ACTION_FORGET_PASSWORD_ERROR = `${name}/${FORGET_PASSWORD_ERROR}`;

export const forgetPwd = createAction<IForgetPwd>(ACTION_FORGET_PASSWORD);
export const forgetPwdSuccessful = createAction(ACTION_FORGET_PASSWORD_SUCCESS);
export const forgetPwdFailed = createAction(ACTION_FORGET_PASSWORD_ERROR);