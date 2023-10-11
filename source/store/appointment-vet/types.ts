import { LOADING } from "~/helpers/loading";
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

export interface IAppointmentVet {
    id?: string; 
    pet_data: PetData
    vets_data: VetsData[]
    cpf_tutor: string
    name_tutor: string
    contact_tutor: ContactTutor
    location_tutor: LocationTutor
    responsible_tutors: ResponsibleTutors
    health_insurance: HealthInsurance
}

export interface PetData {
    id?: string | null
    name_pet: string | null
    microchip: string | null
    identification_number: string | null
    specie: string | null
    race: string | null
    blood_type: string | null
    blood_donator: string | null
    organ_donor: string | null
    sex: string | null
    date_birth: string | null
  }
  
  export interface VetsData {
    name_vet: string | null
    crmv_vet: string | null
    cpf_cnpj_vet: string | null
  }
  
  export interface ContactTutor {
    email: string | null
    phone: string | null
    whatsapp: string | null
  }
  
  export interface LocationTutor {
    country: string | null
    zipCode: string | null
    state: string | null
    city: string | null
    neighborhood: string | null
    street: string | null
    number: string | null
    complement: string | null
  }
  
  export interface ResponsibleTutors {
    name_tutor: string | null
    cpf_tutor: string | null
  }
  
  export interface HealthInsurance {
    name: string | null
    type_health: string | null
    number_health: string | null
    validity: string | null
  }
  

export interface Data extends IAppointmentVet {

}

export type IAppointmentVetData = {
    all_scheduled: Data[];
    all_scheduled_confirmed: Data[];
    all_scheduled_canceled: Data[];
    all_scheduled_confirmed_done: Data[];
}

export type InitialState = {
    isLoading: LOADING;
    isLoadingOnlyOne: LOADING;
    error: string | null;
};

export const name = 'appointment-vet';

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
