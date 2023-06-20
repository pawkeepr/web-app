import { createAction } from '@reduxjs/toolkit';

import {
    ACTION_EDIT_PROFILE,
    ACTION_EDIT_PROFILE_ERROR,
    ACTION_EDIT_PROFILE_SUCCESS,
    ACTION_RESET_PROFILE_FLAG,
    ACTION_SET_PROFILE,
    Profile,
} from './types';

export const setProfile = createAction<Profile>(ACTION_SET_PROFILE);
export const editProfile = createAction<Profile>(ACTION_EDIT_PROFILE);
export const editProfileSuccess = createAction(ACTION_EDIT_PROFILE_SUCCESS);
export const editProfileError = createAction(ACTION_EDIT_PROFILE_ERROR);
export const resetProfileFlag = createAction(ACTION_RESET_PROFILE_FLAG);