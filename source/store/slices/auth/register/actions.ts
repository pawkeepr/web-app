import { createAction } from '@reduxjs/toolkit';
import { AccountSignUp, name } from './types';

export const registerUser = createAction<AccountSignUp>(`${name}/registerUser`);
export const registerUserSuccessful = createAction(
    `${name}/registerUserSuccessful`,
);
export const registerUserFailed = createAction<string>(
    `${name}/registerUserFailed`,
);
export const resetRegisterFlag = createAction(`${name}/resetRegisterFlag`);
