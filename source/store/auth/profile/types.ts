export const name = "profile";

export const SET_PROFILE = `${name}/setProfile`;
export const EDIT_PROFILE = `${name}/editProfile`;
export const PROFILE_SUCCESS = `${name}/profileSuccess`;
export const PROFILE_ERROR = `${name}/profileError`;
export const RESET_PROFILE_FLAG = `${name}/resetProfileFlag`;

export enum RULES {
    ADMIN = 1,
    VETERINARY = 2,
    TUTOR = 3,
}

export type Profile = Nullable<{
    [key: string]: any;
    id: number;
    email: string;
    type: RULES;
    phone: string;
    about: string;
    avatar: string;
    firstName: string,
    lastName: string,
    crmv: string,
    cpf_cnpj: string,
    company: string | null,
    phoneNumber: string,
    country: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    created_at: string;
    updated_at: string;
}>;

export type InitialStateProfile = {
    error: string;
    success: string;
    user: Profile | null;
}