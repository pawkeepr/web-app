import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    GET_ALL,
    GET_ALL_FAIL
} from '../helpers/constants';


import {
    InitialState,
    name,
} from './types';

const initialState: InitialState = {
    error: null,
    data: {
        all_scheduled: [],
        all_scheduled_confirmed: [],
        all_scheduled_canceled: [],
        all_scheduled_done: []
    },
};

const slice = createSlice({
    name,
    initialState,
    reducers: {
        [GET_ALL]: () => { },
        [GET_ALL_FAIL]: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error;
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
