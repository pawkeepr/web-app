import { createSlice } from '@reduxjs/toolkit';
import LOADING from '~/constants/loading';

import {
    FORGET_PASSWORD,
    FORGET_PASSWORD_ERROR,
    FORGET_PASSWORD_SUCCESS,
    ForgetPwdState,
    RESET_LOADING,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_ERROR,
    UPDATE_PASSWORD_SUCCESS,
    name,
} from './types';

const initialState: ForgetPwdState = {
    user: null,
    error: null,
    isLoading: LOADING.IDLE,
    isLoadingUpdate: LOADING.IDLE,
};

const forgetPwd = createSlice({
    name,
    reducers: {
        [FORGET_PASSWORD]: (state) => {
            state.isLoading = LOADING.PENDING;
        },
        [FORGET_PASSWORD_SUCCESS]: (state, action) => {
            state.isLoading = LOADING.SUCCESS;
            state.user = action.payload;
        },
        [FORGET_PASSWORD_ERROR]: (state, action) => {
            state.isLoading = LOADING.FAILED;
            state.error = action.payload;
        },
        [RESET_LOADING]: (state) => {
            state.isLoading = LOADING.IDLE;
        },
        [UPDATE_PASSWORD]: (state) => {
            state.isLoadingUpdate = LOADING.PENDING;
        },
        [UPDATE_PASSWORD_SUCCESS]: (state, action) => {
            state.isLoadingUpdate = LOADING.SUCCESS;
            state.user = action.payload;
        },
        [UPDATE_PASSWORD_ERROR]: (state, action) => {
            state.isLoadingUpdate = LOADING.FAILED;
            state.error = action.payload;
        },
    },
    initialState,
});

export default forgetPwd.reducer;

export const {} = forgetPwd.actions;

export { name };
export type { ForgetPwdState };
