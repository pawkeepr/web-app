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


export type Pet = {
    id: string;
    name: string;
    species: string;
    breed: string;
    gender: 'male' | 'female' | 'neutral';
    dateOfBirth: string;
    color: string;
    allergies: string[];
    preexistingConditions: string[];
    medicationsInUse: string[];
    healthHistory: string[];
    diet: {
        foodType: string;
        dailyAmount: number;
        dietaryRestrictions: string[];
    };
    specialPhysicalFeatures: string[];
    behavior: string;
    tutor_id: string;
    activityLevel: string;
    ownerEmergencyContact: {
        name: string;
        phone: string;
        address: string;
    };
    avatar: string;
    created_at: string;
    updated_at: string;
}

export type PetInitialState = {
    pets: Array<Pet>,
    error: any,
    isPetCreated: boolean,
    isPetSuccess: boolean,
};