import {
    BloodType
} from './bloodType';

import {
    Species
} from './speciesType';

import LOADING from '~/constants/loading';
import {
    ADD_FAIL, ADD_NEW, ADD_SUCCESS,
    DELETE, DELETE_FAIL, DELETE_SUCCESS,
    GET_ALL,
    GET_ALL_ATIVES, GET_ALL_ATIVES_FAIL, GET_ALL_ATIVES_SUCCESS,
    GET_ALL_FAIL,
    GET_ALL_INATIVES, GET_ALL_INATIVES_FAIL, GET_ALL_INATIVES_SUCCESS,
    GET_ALL_SUCCESS,
    STOP_LOADING,
    TOGGLE_STATUS, TOGGLE_STATUS_FAIL, TOGGLE_STATUS_SUCCESS,
    UPDATE, UPDATE_FAIL, UPDATE_SUCCESS
} from "../helpers/constants";
import { ITutor } from '../tutors/types';
import {
    Breed
} from './breedType';

export const name = "Pet"

export type IPet = {
    id: string;
    name: string;
    species: Species;
    breed: Breed;
    gender: GenderPet;
    dateOfBirth: string;
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
    ownerEmergencyContact: ITutor;
    address?: string;
    avatar: string;
    created_at: string;
    updated_at: string;
}

export interface Data extends IPet {

}

export type InitialState = {
    data: Data[];
    inatives: Data[];
    isLoading: LOADING;
    isLoadingOnlyOne: LOADING;
    error: string | null;
};


export enum GenderPet {
    male = 'Macho',
    female = 'Fêmea',
    unknown = 'Desconhecido'
};

export type Diet = {
    foodType: string;
    dailyAmount: number;
    dietaryRestrictions: string[];
}

export type {
    BloodType, Breed, Species
};

export const ACTION_GET_ALL = `${name}/${GET_ALL}`;
export const ACTION_GET_ALL_SUCCESS = `${name}/${GET_ALL_SUCCESS}`;
export const ACTION_GET_ALL_FAIL = `${name}/${GET_ALL_FAIL}`;

export const ACTION_GET_ALL_ATIVES = `${name}/${GET_ALL_ATIVES}`;
export const ACTION_GET_ALL_ATIVES_SUCCESS = `${name}/${GET_ALL_ATIVES_SUCCESS}`;
export const ACTION_GET_ALL_ATIVES_FAIL = `${name}/${GET_ALL_ATIVES_FAIL}`;

export const ACTION_GET_ALL_INATIVES = `${name}/${GET_ALL_INATIVES}`;
export const ACTION_GET_ALL_INATIVES_SUCCESS = `${name}/${GET_ALL_INATIVES_SUCCESS}`;
export const ACTION_GET_ALL_INATIVES_FAIL = `${name}/${GET_ALL_INATIVES_FAIL}`;

export const ACTION_UPDATE = `${name}/${UPDATE}`;
export const ACTION_UPDATE_SUCCESS = `${name}/${UPDATE_SUCCESS}`;
export const ACTION_UPDATE_FAIL = `${name}/${UPDATE_FAIL}`;

export const ACTION_ADD_NEW = `${name}/${ADD_NEW}`;
export const ACTION_ADD_SUCCESS = `${name}/${ADD_SUCCESS}`;
export const ACTION_ADD_FAIL = `${name}/${ADD_FAIL}`;

export const ACTION_DELETE = `${name}/${DELETE}`;
export const ACTION_DELETE_SUCCESS = `${name}/${DELETE_SUCCESS}`;
export const ACTION_DELETE_FAIL = `${name}/${DELETE_FAIL}`;

export const ACTION_TOGGLE_STATUS = `${name}/${TOGGLE_STATUS}`;
export const ACTION_TOGGLE_STATUS_SUCCESS = `${name}/${TOGGLE_STATUS_SUCCESS}`;
export const ACTION_TOGGLE_STATUS_FAIL = `${name}/${TOGGLE_STATUS_FAIL}`;

export const ACTION_STOP_LOADING = `${name}/${STOP_LOADING}`;