import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    GET_ALL,
    GET_ALL_FAIL,
    GET_ALL_SUCCESS,
    STOP_LOADING,
    UPDATE,
    UPDATE_FAIL,
    UPDATE_SUCCESS
} from '../../helpers/constants';


import { LOADING } from '~/helpers/loading';
import {
    Data,
    InitialState,
    SCHEDULED,
    SCHEDULED_CANCELED,
    SCHEDULED_CONFIRMED,
    SCHEDULED_CONFIRMED_DONE,
    name,
} from './types';

const initialState: InitialState = {
    error: null,
    isLoading: LOADING.IDLE,
    isLoadingOnlyOne: LOADING.IDLE,
    all_scheduled: [],
    all_scheduled_canceled: [],
    all_scheduled_confirmed: [],
    all_scheduled_confirmed_done: []
};

const slice = createSlice({
    name,
    initialState,
    reducers: {
        // GET ALL
        [SCHEDULED(GET_ALL)]: (state) => {
            state.isLoading = LOADING.PENDING;
        },
        [SCHEDULED(GET_ALL_SUCCESS)]: (state: InitialState, action: PayloadAction<Data[]>) => {
            state.all_scheduled = action.payload;
            state.isLoading = LOADING.SUCCESS;
        },
        [SCHEDULED(GET_ALL_FAIL)]: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error;
            state.isLoading = LOADING.FAILED;
        },
        [SCHEDULED_CANCELED(GET_ALL)]: (state: InitialState) => {
            state.isLoading = LOADING.PENDING;
        },
        [SCHEDULED_CANCELED(GET_ALL_SUCCESS)]: (state, action: PayloadAction<Data[]>) => {
            state.all_scheduled_canceled = action.payload;
            state.isLoading = LOADING.SUCCESS;
        },
        [SCHEDULED_CANCELED(GET_ALL_FAIL)]: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error;
            state.isLoading = LOADING.FAILED;
        },
        [SCHEDULED_CONFIRMED(GET_ALL)]: (state) => {
            state.isLoading = LOADING.PENDING;
        },
        [SCHEDULED_CONFIRMED(GET_ALL_SUCCESS)]: (state, action: PayloadAction<Data[]>) => {
            state.all_scheduled_confirmed = action.payload;
            state.isLoading = LOADING.SUCCESS;
        },
        [SCHEDULED_CONFIRMED(GET_ALL_FAIL)]: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error;
            state.isLoading = LOADING.FAILED;
        },
        [SCHEDULED_CONFIRMED_DONE(GET_ALL)]: (state) => {
            state.isLoadingOnlyOne = LOADING.PENDING;
        },
        [SCHEDULED_CONFIRMED_DONE(GET_ALL_SUCCESS)]: (state, action: PayloadAction<Data>) => {
            state.all_scheduled_confirmed.push(action.payload);
            state.isLoadingOnlyOne = LOADING.SUCCESS;
        },
        [SCHEDULED_CONFIRMED_DONE(GET_ALL_FAIL)]: (state, action) => {
            state.error = action.payload;
            state.isLoadingOnlyOne = LOADING.FAILED;
        },
        // UPDATE
        [SCHEDULED(UPDATE)]: (state) => {
            state.isLoadingOnlyOne = LOADING.PENDING;
        },
        [SCHEDULED(UPDATE_SUCCESS)]: (state: InitialState, action: PayloadAction<Data>) => {
            const index = state.all_scheduled.findIndex((data) => data.id?.toString() === action.payload.id?.toString())
            state.all_scheduled[index] = action.payload
            state.isLoadingOnlyOne = LOADING.SUCCESS;
        },
        [SCHEDULED(UPDATE_FAIL)]: (state: InitialState, action) => {
            state.error = action.payload;
            state.isLoadingOnlyOne = LOADING.FAILED;
        },
        [SCHEDULED_CANCELED(UPDATE)]: (state) => {
            state.isLoadingOnlyOne = LOADING.PENDING;
        },
        [SCHEDULED_CANCELED(UPDATE_SUCCESS)]: (state: InitialState, action: PayloadAction<Data>) => {
            const index = state.all_scheduled_canceled.findIndex((data) => data.id?.toString() === action.payload.id?.toString())
            state.all_scheduled_canceled[index] = action.payload
            state.isLoadingOnlyOne = LOADING.SUCCESS;
        },
        [SCHEDULED_CANCELED(UPDATE_FAIL)]: (state, action) => {
            state.error = action.payload;
            state.isLoadingOnlyOne = LOADING.FAILED;
        },
        [SCHEDULED_CONFIRMED(UPDATE)]: (state) => {
            state.isLoadingOnlyOne = LOADING.PENDING;
        },
        [SCHEDULED_CONFIRMED(UPDATE_SUCCESS)]: (state: InitialState, action: PayloadAction<Data>) => {
            const index = state.all_scheduled_confirmed.findIndex((data) => data.id?.toString() === action.payload.id?.toString())
            state.all_scheduled_confirmed[index] = action.payload
            state.isLoadingOnlyOne = LOADING.SUCCESS;
        },
        [SCHEDULED_CONFIRMED(UPDATE_FAIL)]: (state, action) => {
            state.error = action.payload;
            state.isLoadingOnlyOne = LOADING.FAILED;
        },
        [SCHEDULED_CONFIRMED_DONE(UPDATE)]: (state) => {
            state.isLoadingOnlyOne = LOADING.PENDING;
        },
        [SCHEDULED_CONFIRMED_DONE(UPDATE_SUCCESS)]: (state: InitialState, action: PayloadAction<Data>) => {
            const index = state.all_scheduled_confirmed_done.findIndex((data) => data.id?.toString() === action.payload.id?.toString())
            state.all_scheduled_confirmed_done[index] = action.payload
            state.isLoadingOnlyOne = LOADING.SUCCESS;
        },
        [SCHEDULED_CONFIRMED_DONE(UPDATE_FAIL)]: (state, action) => {
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
