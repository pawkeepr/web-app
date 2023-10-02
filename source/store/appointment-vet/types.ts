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
    id?: string; // UUID é normalmente representado como string em TypeScript
    id_pet?: string;
    pet_data: {
        name_pet: string,
        microchip: string,
        identification_number: string,
        specie: string,
        race: string,
        blood_type: string,
        blood_donator: string,
        organ_donor: string,
        sex: string,
        date_birth: string
    };
    cpf_tutor: string;
    tutor_data: {
        name: string,
        email: string,
        phone: string,
        country: string,
        zipCode: string,
        state: string,
        city: string
    };
    crmv_vet: string;
    cpf_cnpj_vet: string;
    vet_data: {
        name: string,
        email: string,
        phone: string,
        country: string,
        zipCode: string,
        state: string,
        city: string
    };
    medicines: Record<string, string>[];
    anamnesis: {
        digestive_system: [
            {
              question: string,
              options: string
            }
          ],
          respiratory_system: [
            {
              question: string,
              options: string
            }
          ],
          locomotor_system: [
            {
              question: string,
              options: string
            }
          ],
          urinary_system: [
            {
              question: string,
              options: string
            }
          ],
          nervous_system: [
            {
              question: string,
              options: string
            }
          ]
    };
    vaccines: Record<string, string>[];
    exams: Record<string, string>[];
    nutritions?: Record<string, string>[];
    illnesses?: Record<string, string>[];
    info_required?: Record<string, string>;
    payments?: Record<string, string>;
    dates_consults?: Record<string, string>;
    appointment_status?: Record<string, string>;
    appointment_signature?: Record<string, string>;
    appointment_geolocation?: Record<string, string>;
    tests_fasts?: Record<string, string>[];
    dental_treatment: {
        reason_query: string,
        oral_examination: string,
        treatments_performed: Record<string, string>[],
        recommendations: string
    }
    well_being: {
        perform_activity: string,
        activities_carry: []
    },
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
