import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    ADD_FAIL,
    ADD_NEW,
    ADD_SUCCESS,
    GET_ALL,
    GET_ALL_ATIVES,
    GET_ALL_ATIVES_FAIL,
    GET_ALL_ATIVES_SUCCESS,
    GET_ALL_FAIL,
    GET_ALL_INATIVES,
    GET_ALL_INATIVES_FAIL,
    GET_ALL_INATIVES_SUCCESS,
    GET_ALL_SUCCESS,
    STOP_LOADING
} from '../helpers/constants';


import { LOADING } from '~/helpers/loading';
import {
    Data,
    InitialState,
    name,
} from './types';

const initialState: InitialState = {
    error: null,
    isLoading: LOADING.IDLE,
    isLoadingOnlyOne: LOADING.IDLE
}
const slice = createSlice({
    name,
    initialState,
    reducers: {
        [GET_ALL]: (state) => {
            state.isLoading = LOADING.PENDING;
        },
        [GET_ALL_SUCCESS]: (state, action: PayloadAction<Data[]>) => {
            state.isLoading = LOADING.SUCCESS;
        },
        [GET_ALL_FAIL]: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error;
            state.isLoading = LOADING.FAILED;
        },
        [GET_ALL_ATIVES]: (state) => {
            state.isLoading = LOADING.PENDING;
        },
        [GET_ALL_ATIVES_SUCCESS]: (state, action: PayloadAction<Data[]>) => {
            state.isLoading = LOADING.SUCCESS;
        },
        [GET_ALL_ATIVES_FAIL]: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error;
            state.isLoading = LOADING.FAILED;
        },
        [GET_ALL_INATIVES]: (state) => {
            state.isLoading = LOADING.PENDING;
        },
        [GET_ALL_INATIVES_SUCCESS]: (state, action: PayloadAction<Data[]>) => {
            state.isLoading = LOADING.SUCCESS;
        },
        [GET_ALL_INATIVES_FAIL]: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error;
            state.isLoading = LOADING.FAILED;
        },
        [ADD_NEW]: (state) => {
            state.isLoadingOnlyOne = LOADING.PENDING;
        },
        [ADD_SUCCESS]: (state, action: PayloadAction<Data>) => {
            state.isLoadingOnlyOne = LOADING.SUCCESS;
        },
        [ADD_FAIL]: (state, action) => {
            state.error = action.payload;
            state.isLoadingOnlyOne = LOADING.FAILED;
        },
        [STOP_LOADING]: (state) => {
            state.isLoading = LOADING.IDLE;
            state.isLoadingOnlyOne = LOADING.IDLE;
        },
        resetValue: (state) => {
            return initialState;
        },
    }
});

export const {
    resetValue
} = slice.actions;

export default slice.reducer;
