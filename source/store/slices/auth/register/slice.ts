import { createSlice } from '@reduxjs/toolkit';

import { AccountState, name } from './types';

import LOADING from '~/constants/loading';
import { registerUser, resetRegisterFlag } from './actions';

const initialState: AccountState = {
    message: null,
    loading: LOADING.IDLE,
    success: false,
    error: false,
};

const accountSlice = createSlice({
    name,
    initialState,
    reducers: {
        registerUser: (state) => {
            state.loading = LOADING.PENDING;
        },
        registerUserSuccessful: (state, action) => {
            state.loading = LOADING.SUCCESS;
            state.success = true;
        },
        registerUserFailed: (state, action) => {
            state.loading = LOADING.FAILED;
            state.message = action.payload;
            state.error = true;
        },
        resetRegisterFlag: (state) => {
            state.loading = LOADING.IDLE;
            state.success = false;
            state.error = false;
        },
    },
});

export { registerUser, resetRegisterFlag };

export default accountSlice.reducer;
