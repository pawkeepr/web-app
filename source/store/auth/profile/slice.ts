import { createSlice } from "@reduxjs/toolkit";

import { InitialStateProfile, name } from './types';

const initialState: InitialStateProfile = {
    error: "",
    success: "",
    user: null,
};

const profileSlice = createSlice({
    name,
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.error = "";
            state.success = "";
            state.user = action.payload;
        },
        editProfile: (state) => {
            state.error = "";
            state.success = "";
        },
        profileSuccess: (state, action) => {
            state.error = "";
            state.success = action.payload.status;
            state.user = action.payload.data;
        },
        profileError: (state, action) => {
            state.error = action.payload;
            state.success = "";
        },
        resetProfileFlag: (state) => {
            state.success = "";
            state.error = "";
            state.user = null;
        }
    }
});

export default profileSlice.reducer;
