import {
    BloodType
} from './bloodType';

import {
    Species
} from './speciesType';

import { Tutor } from '../tutor/types';
import {
    Breed
} from './breedType';


import LOADING from '~/constants/loading';

export const name = "Pet"

export const GET_PETS = `${name}/getPets`;
export const UPDATE_PET = `${name}/updatePet`;
export const UPDATE_PET_SUCCESS = `${name}/updatePetSuccess`;
export const UPDATE_PET_FAIL = `${name}/updatePetFail`;
export const ADD_NEW_PET = `${name}/addNewPet`;
export const ADD_PET_SUCCESS = `${name}/addPetSuccess`;
export const ADD_PET_FAIL = `${name}/addPetFail`;
export const DELETE_PET = `${name}/deletePet`;
export const DELETE_PET_SUCCESS = `${name}/deletePetSuccess`;
export const DELETE_PET_FAIL = `${name}/deletePetFail`;
export const CRM_API_RESPONSE_SUCCESS = `${name}/apiResponseSuccess`;
export const CRM_API_RESPONSE_ERROR = `${name}/apiResponseError`;
export const RESET_CREATED_PET = `${name}/resetCreatedPet`;


export enum GenderPet {
    male = 'Macho',
    female = 'Fêmea',
    unknown = 'Desconhecido',
    
};

export type Diet = {
    foodType: string;
    dailyAmount: number;
    dietaryRestrictions: string[];
}

export type Pet = {
    id: string;
    name: string;
    species: Species;
    breed: Breed;
    sex: GenderPet;
    date_birth: string;
    bloodType: BloodType;
    color: string;
    allergies: string[];
    preexistingConditions: string[];
    medicationsInUse: string[];
    castrated: boolean;
    dateOfCastration: string;
    dateOfAdoption: string;
    healthHistory: string[];
    diet: Diet;
    specialPhysicalFeatures: string[];
    behavior: string;
    activityLevel: string;
    ownerEmergencyContact: Tutor;
    address?: string;
    avatar: string;
    created_at: string;
    updated_at: string;
}

export type PetInitialState = {
    pets: Array<Pet>,
    error: any,
    isPetCreated: Pet | null,
    isPetSuccess: boolean,
    isLoading: LOADING,
};

export type {
    BloodType, Breed, Species
};

