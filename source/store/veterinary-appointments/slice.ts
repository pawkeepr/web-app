import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { VeterinaryAppointment, VeterinaryAppointmentInitialState, name } from './types';

const initialState: VeterinaryAppointmentInitialState = {
    veterinaryAppointments: [],
    error: {},
    isVeterinaryAppointmentCreated: false,
    isVeterinaryAppointmentSuccess: false,
};

export const veterinaryAppointmentsSlice = createSlice({
    name,
    initialState,
    reducers: {
        apiResponseSuccess: (state, action: PayloadAction<VeterinaryAppointment[]>) => {
            state.veterinaryAppointments = action.payload;
            state.isVeterinaryAppointmentCreated = false;
            state.isVeterinaryAppointmentSuccess = true;
        },
        apiResponseError: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error;
            state.isVeterinaryAppointmentCreated = false;
            state.isVeterinaryAppointmentSuccess = false;
        },
        addVeterinaryAppointmentSuccess: (state, action: PayloadAction<{ data: any }>) => {
            state.isVeterinaryAppointmentCreated = true;
            state.veterinaryAppointments.push(action.payload.data);
        },
        addVeterinaryAppointmentFail: (state, action) => {
            state.error = action.payload;
        },
        updateVeterinaryAppointmentSuccess: (state, action: PayloadAction<{ data: any }>) => {
            state.veterinaryAppointments = state.veterinaryAppointments.map(pet =>
                pet.id.toString() === action.payload.data._id.toString()
                    ? { ...pet, ...action.payload.data }
                    : pet
            );
        },
        updatePetFail: (state, action) => {
            state.error = action.payload;
        },
        deletePetSuccess: (state, action: PayloadAction<{ veterinaryAppointments: VeterinaryAppointment }>) => {
            state.veterinaryAppointments = state.veterinaryAppointments.filter(
                veterinaryAppointment => veterinaryAppointment.id.toString() !== action.payload.veterinaryAppointments.toString()
            );
        },
        deletePetFail: (state, action) => {
            state.error = action.payload;
        },
    },
});


export const {
    apiResponseSuccess,
    apiResponseError
} = veterinaryAppointmentsSlice.actions;

export default veterinaryAppointmentsSlice.reducer;
