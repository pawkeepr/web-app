import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Pet, PetInitialState, name } from './types';
import LOADING from '~/constants/loading';

const initialState: PetInitialState = {
    pets: [],
    error: null,
    isLoading: LOADING.IDLE,
    isPetCreated: null,
    isPetSuccess: false,
};

export const petSlice = createSlice({
    name,
    initialState,
    reducers: {
        apiResponseSuccess: (state, action: PayloadAction<Pet[]>) => {
            state.pets = action.payload;
            state.isPetSuccess = true;
        },
        apiResponseError: (state, action: PayloadAction<{ error: any }>) => {
            state.error = action.payload.error;
            state.isPetCreated = null;
            state.isPetSuccess = false;
        },
        addNewPet: (state, action: PayloadAction<{ pet: any }>) => {
            state.isLoading = LOADING.PENDING;
            state.isPetCreated = null;
            state.isPetSuccess = false;
            state.error = null;
        },
        addPetSuccess: (state, action: PayloadAction<Pet>) => {
            state.isPetCreated = action.payload;
            state.isPetSuccess = true;
            state.isLoading = LOADING.SUCCESS;
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
        resetCreatedPet: state => {
            state.isPetCreated = null;
            state.isPetSuccess = false;
            state.error = null;
        }
    },
});


export const {
    apiResponseSuccess,
    apiResponseError
} = petSlice.actions;

export default petSlice.reducer;
