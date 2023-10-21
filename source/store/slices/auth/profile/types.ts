import LOADING from "~/constants/loading";
import {
    ADD_FAIL, ADD_NEW, ADD_SUCCESS,
} from "../../helpers/constants";

export const name = "profile";

export const SET_PROFILE = `setProfile`;
export const EDIT_PROFILE = `editProfile`;
export const EDIT_PROFILE_SUCCESS = `editProfileSuccess`;
export const EDIT_PROFILE_ERROR = `editProfileError`;
export const RESET_PROFILE_FLAG = `resetProfileFlag`;
export const GET_PROFILE_SESSION = `getProfileSession`;

export const ACTION_SET_PROFILE = `${name}/${SET_PROFILE}`;
export const ACTION_EDIT_PROFILE = `${name}/${EDIT_PROFILE}`;
export const ACTION_EDIT_PROFILE_SUCCESS = `${name}/${EDIT_PROFILE_SUCCESS}`;
export const ACTION_EDIT_PROFILE_ERROR = `${name}/${EDIT_PROFILE_ERROR}`;
export const ACTION_RESET_PROFILE_FLAG = `${name}/${RESET_PROFILE_FLAG}`;
export const ACTION_GET_PROFILE_SESSION = `${name}/${GET_PROFILE_SESSION}`;

export const ACTION_ADD_NEW = `${name}/${ADD_NEW}`;
export const ACTION_ADD_SUCCESS = `${name}/${ADD_SUCCESS}`;
export const ACTION_ADD_FAIL = `${name}/${ADD_FAIL}`;

export enum RULES {
    ADMIN = 1,
    VETERINARY = 2,
    TUTOR = 3,
}

type Specialty = {
    type: string;
    name_specialty: string;
}

type Contact = {
    email: string;
    phone: string;
    whatsapp: string;
}

type Location = {
    country: string;
    zipCode: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
}

export type Profile = {
    id?: string
    firstName: string;
    lastName: string;
    crmv: string;
    cpf_cnpj: string;
    specialty: string;
    list_service_type: string[];
    list_specialty: Specialty[];
    type: number;
    contact: Contact;
    location: Location;
}

export type InitialStateProfile = {
    isLoading: LOADING;
    error?: string;
    user: Profile | null;
}