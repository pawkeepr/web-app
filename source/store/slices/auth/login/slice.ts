import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import LOADING from '~/constants/loading'

import { api } from '~/services/api'
import type { IProfileCognito } from '~/types/profile'
import { name, type LoginState } from './types'

const initialState: LoginState = {
    user: null,
    isAuthenticated: false,
    rememberMe: false,
    token: '',
    error: null,
    username: '',
    password: '',
    isLoading: LOADING.IDLE,
}

const loginSlice = createSlice({
    name,
    reducers: {
        onChangeUsername: (state, action) => {
            state.username = action.payload
        },
        onChangePassword: (state, action) => {
            state.password = action.payload
        },
        onChangeRememberMe: (state) => {
            state.rememberMe = !state.rememberMe
        },
        onSetRememberMe: (state, action) => {
            state.rememberMe = action.payload
        },

        signOutUser: (state) => {
            state.isLoading = LOADING.IDLE
        },
        signOutUserSuccess: (state) => {
            state.isAuthenticated = false
            state.token = ''
            state.error = null
            state.username = ''
            state.password = ''
            state.isLoading = LOADING.IDLE
        },
        signOutUserFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = LOADING.IDLE
        },

        signInUser: (state) => {
            state.isLoading = LOADING.PENDING
        },
        setAuthorization: (state, action: PayloadAction<{ token: string }>) => {
            if (api.defaults.headers) {
                api.defaults.headers.Authorization = `${action.payload.token}`
            }

            // if (apiFile.defaults.headers) {
            //     apiFile.defaults.headers.Authorization = `${action.payload.token}`
            // }

            state.token = action.payload.token
        },
        signInSuccess: (
            state,
            action: PayloadAction<{ token: string; user: unknown }>,
        ) => {
            state.token = action.payload.token
            state.user = action.payload.user
            state.password = ''
            state.isAuthenticated = true
            state.isLoading = LOADING.SUCCESS
        },
        signInFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = LOADING.FAILED
        },
        recoverUserByToken: (state) => {
            state.isLoading = LOADING.PENDING
        },
        recoverUserByTokenSuccess: (
            state,
            action: PayloadAction<{ user: IProfileCognito; access_token: string }>,
        ) => {
            state.token = action.payload.access_token
            state.isAuthenticated = true
            state.isLoading = LOADING.SUCCESS
        },
        recoverUserByTokenFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isAuthenticated = false
            state.isLoading = LOADING.FAILED
        },
        resetLoading: (state) => {
            state.isLoading = LOADING.IDLE
        },
    },
    initialState,
})

export default loginSlice.reducer

export const {
    onChangePassword,
    onChangeRememberMe,
    onChangeUsername,
    onSetRememberMe,
} = loginSlice.actions

export { name }
export type { LoginState }
