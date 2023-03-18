import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TutorInitialState, name } from './types';

const initialState: TutorInitialState = {
    tutors: [],
    error: {},
    isContactCreated: false,
    isContactSuccess: false,
};

export const contactSlice = createSlice({
    name,
    initialState,
    reducers: {
        apiResponseSuccess: (state, action: PayloadAction<{ data: any, actionType: string }>) => {
            if (action.payload.actionType === 'GET_CONTACTS') {
                state.tutors = action.payload.data;
                state.isContactCreated = false;
                state.isContactSuccess = true;
            }
        },
        apiResponseError: (state, action: PayloadAction<{ error: any, actionType: string }>) => {
            if (action.payload.actionType === 'GET_CONTACTS') {
                state.error = action.payload.error;
                state.isContactCreated = false;
                state.isContactSuccess = false;
            }
        },
        addContactSuccess: (state, action: PayloadAction<{ data: any }>) => {
            state.isContactCreated = true;
            state.tutors.push(action.payload.data);
        },
        addContactFail: (state, action) => {
            state.error = action.payload;
        },
        updateContactSuccess: (state, action: PayloadAction<{ data: any }>) => {
            state.tutors = state.tutors.map(contact =>
                contact._id.toString() === action.payload.data._id.toString()
                    ? { ...contact, ...action.payload.data }
                    : contact
            );
        },
        updateContactFail: (state, action) => {
            state.error = action.payload;
        },
        deleteContactSuccess: (state, action: PayloadAction<{ contact: any }>) => {
            state.tutors = state.tutors.filter(
                contact => contact._id.toString() !== action.payload.contact.toString()
            );
        },
        deleteContactFail: (state, action) => {
            state.error = action.payload;
        },
    },
});

export default contactSlice.reducer;
