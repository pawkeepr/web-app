import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Tutor, TutorInitialState, name } from './types';

const initialState: TutorInitialState = {
    tutors: [],
    error: {},
    isTutorCreated: false,
    isTutorSuccess: false,
};

export const tutorSlice = createSlice({
    name,
    initialState,
    reducers: {
        apiResponseSuccess: (state, action: PayloadAction<Tutor[]>) => {
            state.tutors = action.payload;
            state.isTutorCreated = false;
            state.isTutorSuccess = true;
        },
        apiResponseError: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error;
            state.isTutorCreated = false;
            state.isTutorSuccess = false;
        },
        addTutorSuccess: (state, action: PayloadAction<{ data: any }>) => {
            state.isTutorCreated = true;
            state.tutors.push(action.payload.data);
        },
        addTutorFail: (state, action) => {
            state.error = action.payload;
        },
        updateTutorSuccess: (state, action: PayloadAction<{ data: any }>) => {
            state.tutors = state.tutors.map(tutor =>
                tutor.id.toString() === action.payload.data._id.toString()
                    ? { ...tutor, ...action.payload.data }
                    : tutor
            );
        },
        updateTutorFail: (state, action) => {
            state.error = action.payload;
        },
        deleteTutorSuccess: (state, action: PayloadAction<{ tutor: any }>) => {
            state.tutors = state.tutors.filter(
                tutor => tutor._id.toString() !== action.payload.tutor.toString()
            );
        },
        deleteTutorFail: (state, action) => {
            state.error = action.payload;
        },
    },
});


export const {
    apiResponseSuccess,
    apiResponseError
} = tutorSlice.actions;

export default tutorSlice.reducer;
