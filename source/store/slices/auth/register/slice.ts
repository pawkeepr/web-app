import { createSlice } from '@reduxjs/toolkit'

import { name, type AccountState } from './types'

import LOADING from '~/constants/loading'
import { registerUser, resetRegisterFlag } from './actions'

const initialState: AccountState = {
    message: null,
    typeProfile: null,
    loading: LOADING.IDLE,
    success: false,
    error: false,
}

const accountSlice = createSlice({
    name,
    initialState,
    reducers: {
        registerUser: (state) => {
            state.loading = LOADING.PENDING
        },
        registerUserSuccessful: (state) => {
            state.loading = LOADING.SUCCESS
            state.success = true
        },
        registerUserFailed: (state, action) => {
            state.loading = LOADING.FAILED
            state.message = action.payload
            state.error = true
        },
        resetRegisterFlag: (state) => {
            state.loading = LOADING.IDLE
            state.success = false
            state.error = false
        },
        onChangeTypeProfile: (state, action) => {
            state.typeProfile = action.payload
        },
    },
})

export { registerUser, resetRegisterFlag }

export default accountSlice.reducer
