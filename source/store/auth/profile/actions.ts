import { createAction } from '@reduxjs/toolkit';

import { EDIT_PROFILE, PROFILE_ERROR, PROFILE_SUCCESS, Profile, RESET_PROFILE_FLAG, SET_PROFILE } from './types';


export const setProfile = createAction<Profile>(SET_PROFILE);
export const editProfile = createAction<Profile>(EDIT_PROFILE);
export const profileSuccess = createAction(PROFILE_SUCCESS);
export const profileError = createAction(PROFILE_ERROR);
export const resetProfileFlag = createAction(RESET_PROFILE_FLAG);