import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Pet, PetInitialState, name } from './types';

const initialState: PetInitialState = {
    pets: [],
    error: {},
    isPetCreated: false,
    isPetSuccess: false,
};

export const petSlice = createSlice({
    name,
    initialState,
    reducers: {
        apiResponseSuccess: (state, action: PayloadAction<Pet[]>) => {
            state.pets = action.payload;
            state.isPetCreated = false;
            state.isPetSuccess = true;
        },
        apiResponseError: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error;
            state.isPetCreated = false;
            state.isPetSuccess = false;
        },
        addPetSuccess: (state, action: PayloadAction<{ data: any }>) => {
            state.isPetCreated = true;
            state.pets.push(action.payload.data);
        },
        addPetFail: (state, action) => {
            state.error = action.payload;
        },
        updatePetSuccess: (state, action: PayloadAction<{ data: any }>) => {
            state.pets = state.pets.map(pet =>
                pet.id.toString() === action.payload.data._id.toString()
                    ? { ...pet, ...action.payload.data }
                    : pet
            );
        },
        updatePetFail: (state, action) => {
            state.error = action.payload;
        },
        deletePetSuccess: (state, action: PayloadAction<{ pet: any }>) => {
            state.pets = state.pets.filter(
                pet => pet._id.toString() !== action.payload.pet.toString()
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
} = petSlice.actions;

export default petSlice.reducer;
