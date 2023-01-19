
// Login Redux States
import { createAsyncThunk } from "@reduxjs/toolkit";

import * as actions from "../types";

//Include Both Helper File with needed methods
import { SignInCredentials, getUser, postJwtLogin } from "~/services/helpers/auth";

import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import LOADING from "~/constants/loading";
import { api } from "~/services/api";

import { setCookie } from 'nookies';
import cookies from '~/constants/cookies';

export const sign_in_user = createAsyncThunk(
    `${actions.name}/login`,
    async ({ username, password }: SignInCredentials) => {
        const { data: token } = await postJwtLogin({
            username,
            password,
        });

        const { data: user } = await getUser(token.access_token);

        return {
            ...token,
            user
        };
    }
);


type Builder = ActionReducerMapBuilder<actions.LoginState>

export const BuilderLogin = (builder: Builder) => {
    builder.addCase(sign_in_user.pending, (state) => {
        state.isLoading = LOADING.PENDING;
    });
    builder.addCase(sign_in_user.fulfilled, (state, action) => {

        api.defaults.headers['Authorization'] = `Bearer ${action.payload.access_token}`;

        state.user = action.payload.user;
        state.token = action.payload.access_token;

        setCookie(undefined, cookies.token.name, action.payload.access_token, {
            maxAge: cookies.token.expires,
        });

        state.isAuthenticated = true;
        state.error = null;
        state.isLoading = LOADING.SUCCESS;
    });
    builder.addCase(sign_in_user.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = LOADING.IDLE;
    });

}

