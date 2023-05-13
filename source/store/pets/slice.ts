import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Pet, PetInitialState, name } from './types';
import LOADING from '~/constants/loading';

const initialState: PetInitialState = {
    pets: [],
    error: {},
    isLoading: LOADING.IDLE,
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
        addPet: (state, action: PayloadAction<{ pet: any }>) => {
            state.isLoading = LOADING.PENDING;
        },
        addPetSuccess: (state, action: PayloadAction<Pet>) => {
            state.isPetCreated = true;
            state.isLoading = LOADING.IDLE;
            state.pets.push(action.payload);
        },
        addPetFail: (state, action) => {
            state.error = action.payload;
            state.isLoading = LOADING.IDLE;
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
                pet => pet.id.toString() !== action.payload.pet.toString()
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
