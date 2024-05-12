import { createSlice } from '@reduxjs/toolkit'

import LOADING from '~/constants/loading'
import {
    EDIT_PROFILE,
    EDIT_PROFILE_ERROR,
    EDIT_PROFILE_SUCCESS,
    RESET_PROFILE_FLAG,
    SET_PROFILE,
    name,
    type InitialStateProfile,
} from './types'

import { ADD_FAIL, ADD_NEW, ADD_SUCCESS } from '~/store/helpers/constants'

const initialState: InitialStateProfile = {
    isLoading: LOADING.IDLE,
    user: null,
    error: null,
}

const profileSlice = createSlice({
    name,
    initialState,
    reducers: {
        [ADD_NEW]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ADD_SUCCESS]: (state) => {
            state.error = null
            state.isLoading = LOADING.SUCCESS
        },
        [ADD_FAIL]: (state, action) => {
            state.error = action.payload
            state.isLoading = LOADING.FAILED
        },
        [SET_PROFILE]: (state, action) => {
            state.user = action.payload
        },
        [EDIT_PROFILE]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [EDIT_PROFILE_SUCCESS]: (state, action) => {
            state.error = null
            state.isLoading = LOADING.SUCCESS
            state.user = action.payload
        },
        [EDIT_PROFILE_ERROR]: (state, action) => {
            state.error = action.payload
            state.isLoading = LOADING.FAILED
        },
        [RESET_PROFILE_FLAG]: (state) => {
            state.isLoading = LOADING.IDLE
            state.user = null
        },
    },
})

export default profileSlice.reducer
