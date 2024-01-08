import { IMainResponsibleGuardian, PetData } from './pet-v2';
import { DTOProfile } from './profile';

export interface VeterinaryConsultation {
    id_pet: string;
    cpf_tutor: string;
    crmv_vet: string;
    cpf_cnpj_vet: string;
    dates_consults: DateConsults;
    tutor_pet_vet: TutorPetVet;
    details_pet_consultation: DetailsPetConsultation;
    anamnesis: Anamnesis;
    treatments: Treatments;
    appointment_details: AppointmentDetails;
}

export interface DateConsults {
    date_consultation: string;
    time_consultation: string;
    type_consultation: string;
    reason_consultation: string;
    additional_remarks: string;
}

export interface TutorPetVet {
    tutor: IMainResponsibleGuardian;
    pet: PetData;
    veterinary: DTOProfile;
}

export interface DetailsPetConsultation {
    age: string;
    height: string;
    length: string;
    weight: string;
    type_weight: string;
    imc: string;
}

export interface Anamnesis {
    questions_anamnesis: QuestionAnamnesis[];
    note: string;
}

export interface QuestionAnamnesis {
    type_anamnesis: string;
    name_anamnesis: string;
    notes_anamnesis: string;
    list_notes_anamnesis: string[];
    options_anamnesis: string;
    logical_list_default_anamnesis: string;
}

export interface Treatments {
    questions_treatment: QuestionTreatment[];
    note: string;
}

export interface QuestionTreatment {
    type_treatment: string;
    name_treatment: string;
    notes_treatment: string;
    list_notes_treatment: string[];
    options_anamnesis: string;
    logical_list_default_anamnesis: string;
    value_coin_treatment: string;
    coin_treatment: string;
}

export interface AppointmentDetails {
    payment: Payment;
    appointment_signature: AppointmentSignature;
    appointment_geolocation: AppointmentGeolocation;
}

export interface Payment {
    form_payment: string;
    value_payment: string;
    coin: string;
    number_installments: string;
    status_payment: string;
    date_payment: string;
}

export interface AppointmentSignature {
    signature_data: string;
    date_signature: string;
    type_signature: string;
    status_signature: string;
    ip_address: string;
    browser_device: string;
    operational_system: string;
}

export interface AppointmentGeolocation {
    latitude: string;
    longitude: string;
    precision: string;
    altitude: string;
    speed: string;
    heading: string;
    date_geolocation: string;
}
