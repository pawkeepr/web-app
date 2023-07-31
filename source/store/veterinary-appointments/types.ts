import { Pet } from "../pets/types";
import { Tutor } from "../tutor/types";

export const name = "VeterinaryAppointment";

export const GET_VETERINARY_APPOINTMENTS = `${name}/getVeterinaryAppointments`;
export const UPDATE_VETERINARY_APPOINTMENT = `${name}/updateVeterinaryAppointment`;
export const UPDATE_VETERINARY_APPOINTMENT_SUCCESS = `${name}/updateVeterinaryAppointmentSuccess`;
export const UPDATE_VETERINARY_APPOINTMENT_FAIL = `${name}/updateVeterinaryAppointmentFail`;
export const ADD_NEW_VETERINARY_APPOINTMENT = `${name}/addNewVeterinaryAppointment`;
export const ADD_VETERINARY_APPOINTMENT_SUCCESS = `${name}/addVeterinaryAppointmentSuccess`;
export const ADD_VETERINARY_APPOINTMENT_FAIL = `${name}/addVeterinaryAppointmentFail`;
export const DELETE_VETERINARY_APPOINTMENT = `${name}/deleteVeterinaryAppointment`;
export const DELETE_VETERINARY_APPOINTMENT_SUCCESS = `${name}/deleteVeterinaryAppointmentSuccess`;
export const DELETE_VETERINARY_APPOINTMENT_FAIL = `${name}/deleteVeterinaryAppointmentFail`;
export const CRM_API_RESPONSE_SUCCESS = `${name}/apiResponseSuccess`;
export const CRM_API_RESPONSE_ERROR = `${name}/apiResponseError`;

export type Treatment = {
    id: string;
    medicine: string;
    dose: string;
    continuos: boolean;
    frequency: string;
    duration: string;
    created_at: string;
    updated_at: string;
};

type PaymentMethod =
    | "cash"
    | "credit_card"
    | "debit_card"
    | "check"
    | "transfer"
    | "deposit"
    | "other";

export type Payment = {
    id: string;
    price: number;
    payment_method: PaymentMethod;
    created_at: string;
    updated_at: string;
};

export type Vaccine = {
    id: string;
    name: string;
};

export type Exam = {
    id: string;
    name: string;
};

export type Disease = {
    id?: string;
    name: string;
    typeDisease?: string;
    severity: string;
    symptoms?: Array<string>;
    description: string;
    created_at?: string;
    updated_at?: string;
};

type OmitPet = Nullable<Omit<Pet, "ownerEmergencyContact">>;

export type VeterinaryAppointment = {
    id: string;
    exams: string[] | Array<Partial<Exam>>;
    vaccines: string[] | Array<Partial<Vaccine>>;
    treatments: Array<Partial<Treatment>>;
    diseases: string | Array<Partial<Disease>>;
    payment: Partial<Payment>;
    pet: Partial<OmitPet>;
    tutor: Nullable<Partial<Tutor>>;
    created_at?: string;
    updated_at?: string;
};

export type VeterinaryAppointmentInitialState = {
    veterinaryAppointments: Array<VeterinaryAppointment>;
    error: any;
    isVeterinaryAppointmentCreated: boolean;
    isVeterinaryAppointmentSuccess: boolean;
};
