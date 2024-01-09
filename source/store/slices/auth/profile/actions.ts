import { createAction } from '@reduxjs/toolkit';

import { IProfile } from '~/types/profile';
import {
    ACTION_ADD_FAIL,
    ACTION_ADD_NEW,
    ACTION_ADD_SUCCESS,
    ACTION_EDIT_PROFILE,
    ACTION_EDIT_PROFILE_ERROR,
    ACTION_EDIT_PROFILE_SUCCESS,
    ACTION_GET_PROFILE_SESSION,
    ACTION_RESET_PROFILE_FLAG,
    ACTION_SET_PROFILE,
} from './types';

export const setProfile = createAction<IProfile>(ACTION_SET_PROFILE);
export const editProfile = createAction<IProfile>(ACTION_EDIT_PROFILE);
export const editProfileSuccess = createAction(ACTION_EDIT_PROFILE_SUCCESS);
export const editProfileError = createAction(ACTION_EDIT_PROFILE_ERROR);
export const resetProfileFlag = createAction(ACTION_RESET_PROFILE_FLAG);
export const getProfileSession = createAction(ACTION_GET_PROFILE_SESSION);

export const addNew = createAction<IProfile>(ACTION_ADD_NEW);
export const addSuccess = createAction(ACTION_ADD_SUCCESS);
export const addFail = createAction(ACTION_ADD_FAIL);
