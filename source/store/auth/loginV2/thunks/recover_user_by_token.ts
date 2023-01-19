
// Login Redux States
import { createAsyncThunk } from "@reduxjs/toolkit";

import * as actions from "../types";

//Include Both Helper File with needed methods
import { getUser } from "~/services/helpers/auth";

import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import LOADING from "~/constants/loading";
import { api } from "~/services/api";


export const recover_user_by_token = createAsyncThunk(
    `${actions.name}/recover_user_by_token`,
    async ({ token }: { token: string }) => {

        const { data: user } = await getUser(token);

        return {
            user,
            access_token: token
        };
    }
);


type Builder = ActionReducerMapBuilder<actions.LoginState>

export const BuilderRecoverUser = (builder: Builder) => {
    builder.addCase(recover_user_by_token.pending, (state) => {
        state.isLoading = LOADING.PENDING;
    });
    builder.addCase(recover_user_by_token.fulfilled, (state, action) => {
        api.defaults.headers['Authorization'] = `Bearer ${action.payload.access_token}`;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isUserLogout = false;
        state.error = null;
        state.isLoading = LOADING.SUCCESS;
    });
    builder.addCase(recover_user_by_token.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = LOADING.IDLE;
    });

}

