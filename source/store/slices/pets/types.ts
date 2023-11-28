import {
    BloodType
} from './bloodType';

import {
    Gender,
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
} from "~/store/helpers/constants";
import { IPetV2 } from '~/types/pet-v2';
import {
    Breed
} from './breedType';


export const name = "Pet"


export interface Data extends IPetV2 {
    id: "123456789",
    name_tutor: "João Silva",
    phone_tutor: "(11) 91234-5678",
    contact_tutor: {
        email: "joao@example.com",
        phone: "(11) 98765-4321",
        whatsapp: "5511987654321"
    },
    has_second_tutor: true,
    cpf_tutor: "123.456.789-00",
    vets_data: ["Veterinário 1", "Veterinário 2"],
    location_tutor: {
        country: "Brasil",
        zipCode: "01234-567",
        state: "São Paulo",
        city: "São Paulo",
        neighborhood: "Centro",
        street: "Rua Exemplo",
        number: "123",
        complement: "Apto 101"
    },
    pet_data: {
        name_pet: 'Rex',
        specie: Species.cat,
        race: Breed,
        sex: Gender.female,
        castrated: true,
        microchip: '123456789012345',
        identification_number: 'ID123',
        blood_type: 'AB+',
        blood_donator: 'No',
        organ_donor: 'No',
        date_birth: '2019-05-15'
    
    },
    health_insurance: {
        name: "Seguradora Pet",
        type_health: "Plano de Saúde Pet",
        number_health: "ABC123XYZ",
        validity: "01/2024"
    },
    responsible_tutors: {
        name_tutor: "Maria Silva",
        cpf_tutor: "987.654.321-00"
    }
}

export type InitialState = {
    data: Data[];
    inatives: Data[];
    isLoading: LOADING;
    isLoadingOnlyOne: LOADING;
    error: string | null;
};


//apaguei aqui o gander pet

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

