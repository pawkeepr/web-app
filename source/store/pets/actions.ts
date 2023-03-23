import { createAction } from '@reduxjs/toolkit';

import {
    ADD_NEW_PET,
    ADD_PET_FAIL,
    ADD_PET_SUCCESS,
    DELETE_PET,
    DELETE_PET_FAIL,
    DELETE_PET_SUCCESS,
    GET_PETS,
    UPDATE_PET,
    UPDATE_PET_FAIL,
    UPDATE_PET_SUCCESS
} from './types';

export const getPets = createAction(GET_PETS);
export const updatePet = createAction<{ [key: string]: any }>(UPDATE_PET);
export const updatePetSuccess = createAction<{ [key: string]: any }>(UPDATE_PET_SUCCESS);
export const updatePetFail = createAction<string>(UPDATE_PET_FAIL);
export const addNewPet = createAction<{ [key: string]: any }>(ADD_NEW_PET);
export const addPetSuccess = createAction<{ [key: string]: any }>(ADD_PET_SUCCESS);
export const addPetFail = createAction<string>(ADD_PET_FAIL);
export const deletePet = createAction<{ [key: string]: any }>(DELETE_PET);
export const deletePetSuccess = createAction<{ [key: string]: any }>(DELETE_PET_SUCCESS);
export const deletePetFail = createAction<string>(DELETE_PET_FAIL);
