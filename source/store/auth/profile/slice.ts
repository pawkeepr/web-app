import { createSlice } from "@reduxjs/toolkit";

import LOADING from "~/constants/loading";
import {
    EDIT_PROFILE,
    EDIT_PROFILE_ERROR,
    EDIT_PROFILE_SUCCESS,
    InitialStateProfile,
    RESET_PROFILE_FLAG,
    SET_PROFILE,
    name
} from './types';

const initialState: InitialStateProfile = {
    isLoading: LOADING.IDLE,
    user: null,
    error: "",
};

const profileSlice = createSlice({
    name,
    initialState,
    reducers: {
        [SET_PROFILE]: (state, action) => {
            state.user = action.payload;
        },
        [EDIT_PROFILE]: (state) => {
            state.isLoading = LOADING.PENDING;
        },
        [EDIT_PROFILE_SUCCESS]: (state, action) => {
            state.error = "";
            state.isLoading = LOADING.SUCCESS;
            state.user = action.payload.data;
        },
        [EDIT_PROFILE_ERROR]: (state, action) => {
            state.error = action.payload;
            state.isLoading = LOADING.FAILED;
        },
        [RESET_PROFILE_FLAG]: (state) => {
            state.isLoading = LOADING.IDLE;
            state.user = null;
        }
    }
});

export default profileSlice.reducer;
