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
} from "~/store/helpers/constants";
import { GenericObject } from "~/store/helpers/types";

export interface IPetAppointment {
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
}

export interface ITutorAppointment {
    name: string,
    email: string,
    phone: string,
    country: string,
    zipCode: string,
    state: string,
    city: string
}

export interface IVetAppointment {
    name: string,
    email: string,
    phone: string,
    country: string,
    zipCode: string,
    state: string,
    city: string
}

export interface IMedicineAppointment {
    name_medicine: string,
    brand: string,
    continuous_use: string,
    amount: string,
    type_medicine: string,
    interval: string,
    period: string,
    date_init: string,
    date_end: string,
    value_medicine: string,
    coin_medicine: string
}

export type IQuestionAnamnesis = {
    question: string,
    options: string
}

export interface IAnamnesisAppointment {
    physical_activity: IQuestionAnamnesis[],
    digestive_system: IQuestionAnamnesis[],
    respiratory_system: IQuestionAnamnesis[],
    locomotor_system: IQuestionAnamnesis[],
    urinary_system: IQuestionAnamnesis[],
    nervous_system: IQuestionAnamnesis[]
}

export interface IVaccineAppointment {
    name_vaccine: string
    brand: string
    batch: string
    local: string
    dose: string
    date_application: string
    date_next_application: string
    who_applied: string
    health_insurance: string
    value_vaccine: string
    coin_vaccine: string
}

export interface IExamsAppointment {
    name_exame: string,
    local: string,
    realization_date: string,
    appointment_date: string,
    time_date: string,
    who_applied: string,
    health_insurance: string,
    type_exame: string,
    value_exam: string,
    coin_exam: string
}


export interface INutritionsAppointment {
    food_name: string,
    food_start_time: string,
    amount: string,
    measure: string,
    interval: string,
    period: string,
    starting_date: string,
    type_nutrition: string,
    value_nutrition: string,
    coin_nutrition: string
}

export interface IllnessesAppointment {
    name_illness: string,
    symptoms: string,
    prevention: string,
    treatment: string,
    date_identified: string
}

export interface IInfo_required {
    age: string,
    height: string,
    length: string,
    weight: string,
    type_weight: string,
    imc: string,
    guidelines_notes: string
}

export interface IPaymentsAppointment {
    form_payment: string,
    value_payment: string,
    coin: string,
    number_installments: string | GenericObject,
    status_payment: string,
    date_payment: string
}

export interface IDatesConsultsAppointment {
    date_consultation: string,
    time_consultation: string,
    type_consultation: string,
    reason_consultation: string,
    additional_remarks: string,
    date_next_consultation: string,
    time_next_consultation: string
}

export enum BOOL_STATUS {
    TRUE = 'yes',
    FALSE = 'no',
    UNFORESEEN = 'unforeseen'
}
export interface IStatusAppointment {
    scheduled: BOOL_STATUS,
    confirmed: BOOL_STATUS,
    done: BOOL_STATUS,
    canceled: BOOL_STATUS,
    reason_canceled: string
}

export interface ISignatureAppointment {
    ip_address: string,
    browser_device: string,
    operational_system: string
}


export interface IGeolocationAppointment {
    latitude: string,
    longitude: string,
    precision: string,
    altitude: string,
    speed: string
}

export interface ITests_FastsAppointment {
    test_type: string,
    result: string,
    notes: string
}

export interface IDental_treatmentAppointment {
    reason_query: string,
    oral_examination: string,
    treatments_performed: Record<string, string>[],
    recommendations: string
}

export interface IWell_beingAppointment {
    perform_activity: string,
    activities_carry: []
}

export interface IAnamnesis {
    digestive_system: boolean
    respiratory_system: boolean
    urinary_system: boolean
    nervous_system: boolean
    locomotor_system: boolean
    anamnesis?: IAnamnesisAppointment
}

export interface ITreatment {
    apply_medicine: boolean
    medicines: IMedicineAppointment[];
    apply_vaccine: boolean
    vaccines: IVaccineAppointment[];
    apply_exam: boolean
    exams: IExamsAppointment[];
    apply_nutrition: boolean
    nutritions: INutritionsAppointment[];
    apply_disease: boolean
    illnesses: IllnessesAppointment[];
    apply_fast_test: boolean
    tests_fasts: ITests_FastsAppointment[];
}

export interface IAppointmentVet extends IAnamnesis, ITreatment {
    id?: string | null;
    pet_data: PetData
    vets_data: VetsData[]
    cpf_tutor: string
    name_tutor: string
    contact_tutor: ContactTutor
    location_tutor: LocationTutor
    responsible_tutors: ResponsibleTutors
    health_insurance: HealthInsurance
    id_pet: string;
    tutor_data: ITutorAppointment;
    crmv_vet: string;
    cpf_cnpj_vet: string;
    vet_data: IVetAppointment;
    anamnesis: IAnamnesisAppointment;
    info_required: IInfo_required;
    payments: IPaymentsAppointment;
    dates_consults: IDatesConsultsAppointment;
    appointment_status: IStatusAppointment;
    appointment_signature: ISignatureAppointment;
    appointment_geolocation: IGeolocationAppointment;
    dental_treatment: IDental_treatmentAppointment;
    well_being: IWell_beingAppointment;
}

export interface IScheduledAppointmentVet {
    id?: string | null;
    pet_data: PetData
    vets_data: VetsData[]
    cpf_tutor: string
    name_tutor: string
    contact_tutor: ContactTutor
    location_tutor: LocationTutor
    responsible_tutors: never
    health_insurance: HealthInsurance
    id_pet: string;
    tutor_data: ITutorAppointment;
    crmv_vet: string;
    cpf_cnpj_vet: string;
    vet_data: IVetAppointment;
    anamnesis: never;
    info_required: IInfo_required;
    payments: never;
    dates_consults: IDatesConsultsAppointment;
    appointment_status: IStatusAppointment;
    appointment_signature: ISignatureAppointment;
    appointment_geolocation: IGeolocationAppointment;
    dental_treatment: never;
    well_being: never;
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
    phone_vet: string | null
    email_vet: string | null
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
    all_scheduled: Data[],
    all_scheduled_canceled: Data[],
    all_scheduled_confirmed: Data[],
    all_scheduled_confirmed_done: Data[]
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
