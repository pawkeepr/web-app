import { createSlice } from '@reduxjs/toolkit'

import LOADING from '~/constants/loading'
import {
    ACTIVATE_ACCOUNT,
    ACTIVATE_ACCOUNT_ERROR,
    ACTIVATE_ACCOUNT_SUCCESS,
    InitialStateProfile,
    RESET_PROFILE_FLAG,
    SET_EMAIL_ACCOUNT,
    SET_PASSWORD_ACCOUNT,
    name,
} from './types'

const initialState: InitialStateProfile = {
    error: '',
    user: null,
    password: '',
    email: '',
    isLoading: LOADING.IDLE,
}

const profileSlice = createSlice({
    name,
    initialState,
    reducers: {
        [SET_EMAIL_ACCOUNT]: (state, action) => {
            state.email = action.payload
        },
        [SET_PASSWORD_ACCOUNT]: (state, action) => {
            state.password = action.payload
        },
        [ACTIVATE_ACCOUNT]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ACTIVATE_ACCOUNT_SUCCESS]: (state, action) => {
            state.isLoading = LOADING.SUCCESS
            state.user = action.payload
        },
        [ACTIVATE_ACCOUNT_ERROR]: (state, action) => {
            state.isLoading = LOADING.FAILED
            state.error = action.payload
        },
        [RESET_PROFILE_FLAG]: (state) => {
            state.isLoading = LOADING.IDLE
            state.error = ''
            state.user = null
        },
    },
})

export default profileSlice.reducer
