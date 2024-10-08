import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
    ADD_FAIL,
    ADD_NEW,
    ADD_SUCCESS,
    DELETE_FAIL,
    DELETE_SUCCESS,
    GET_ALL,
    GET_ALL_ATIVES,
    GET_ALL_ATIVES_FAIL,
    GET_ALL_ATIVES_SUCCESS,
    GET_ALL_FAIL,
    GET_ALL_INATIVES,
    GET_ALL_INATIVES_FAIL,
    GET_ALL_INATIVES_SUCCESS,
    GET_ALL_SUCCESS,
    STOP_LOADING,
    TOGGLE_STATUS,
    TOGGLE_STATUS_FAIL,
    TOGGLE_STATUS_SUCCESS,
    UPDATE,
    UPDATE_FAIL,
    UPDATE_SUCCESS,
} from '~/store/helpers/constants'

import { LOADING } from '~/helpers/loading'
import { toggleStatus } from '../../helpers/toggle-status'
import { Data, InitialState, name } from './types'

const initialState: InitialState = {
    error: null,
    isLoading: LOADING.IDLE,
    isLoadingOnlyOne: LOADING.IDLE,
    data: [],
    inatives: [],
}

const slice = createSlice({
    name,
    initialState,
    reducers: {
        [GET_ALL]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [GET_ALL_SUCCESS]: (state, action: PayloadAction<Data[]>) => {
            state.isLoading = LOADING.SUCCESS
        },
        [GET_ALL_FAIL]: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error
            state.isLoading = LOADING.FAILED
        },
        [GET_ALL_ATIVES]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [GET_ALL_ATIVES_SUCCESS]: (state, action: PayloadAction<Data[]>) => {
            state.data = action.payload
            state.isLoading = LOADING.SUCCESS
        },
        [GET_ALL_ATIVES_FAIL]: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error
            state.isLoading = LOADING.FAILED
        },
        [GET_ALL_INATIVES]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [GET_ALL_INATIVES_SUCCESS]: (state, action: PayloadAction<Data[]>) => {
            state.inatives = action.payload
            state.isLoading = LOADING.SUCCESS
        },
        [GET_ALL_INATIVES_FAIL]: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error
            state.isLoading = LOADING.FAILED
        },
        [ADD_NEW]: (state) => {
            state.isLoadingOnlyOne = LOADING.PENDING
        },
        [ADD_SUCCESS]: (state, action: PayloadAction<Data>) => {
            state.data.push(action.payload)
            state.isLoadingOnlyOne = LOADING.SUCCESS
        },
        [ADD_FAIL]: (state, action) => {
            state.error = action.payload
            state.isLoadingOnlyOne = LOADING.FAILED
        },
        [UPDATE]: (state) => {
            state.isLoadingOnlyOne = LOADING.PENDING
        },
        [UPDATE_SUCCESS]: (state, action: PayloadAction<Data>) => {
            const index = state.data.findIndex(
                (data) => data._id.toString() === action.payload._id?.toString(),
            )
            state.data[index] = action.payload
            state.isLoadingOnlyOne = LOADING.SUCCESS
        },
        [UPDATE_FAIL]: (state, action) => {
            state.error = action.payload
            state.isLoadingOnlyOne = LOADING.FAILED
        },

        [DELETE_SUCCESS]: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(
                (data) => data._id.toString() !== action.payload.id,
            )
            state.isLoading = LOADING.SUCCESS
        },
        [DELETE_FAIL]: (state, action) => {
            state.error = action.payload
            state.isLoading = LOADING.FAILED
        },
        [TOGGLE_STATUS]: (state) => {
            state.isLoadingOnlyOne = LOADING.PENDING
        },
        [TOGGLE_STATUS_SUCCESS]: (
            state,
            action: PayloadAction<{ _id: string }>,
        ) => {
            toggleStatus(action.payload._id, state.data, state.inatives)
            state.isLoadingOnlyOne = LOADING.SUCCESS
        },
        [TOGGLE_STATUS_FAIL]: (state, action) => {
            state.error = action.payload
            state.isLoadingOnlyOne = LOADING.FAILED
        },
        [STOP_LOADING]: (state) => {
            state.isLoading = LOADING.IDLE
            state.isLoadingOnlyOne = LOADING.IDLE
        },
        resetValue: (state) => {
            return initialState
        },
    },
})

export const { resetValue } = slice.actions

export default slice.reducer
