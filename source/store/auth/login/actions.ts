import { createAction } from '@reduxjs/toolkit';

import { name } from './types';

export const signInUser = createAction<{ username: string, password: string }>(`${name}/signInUser`);
export const signInSuccess = createAction<{ user: any, token: any }>(`${name}/signInSuccess)`);
export const signInFailed = createAction<string>(`${name}/signInFailed`);

export const recoverUserByToken = createAction<string>(`${name}/recoverUserByToken`);
export const recoverUserByTokenSuccess = createAction<{ user: any, access_token: string }>(`${name}/recoverUserByTokenSuccess`);
export const recoverUserByTokenFailed = createAction<string>(`${name}/recoverUserByTokenFailed`);