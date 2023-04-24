export const name = "profile";

export const SET_PROFILE = `${name}/setProfile`;
export const EDIT_PROFILE = `${name}/editProfile`;
export const PROFILE_SUCCESS = `${name}/profileSuccess`;
export const PROFILE_ERROR = `${name}/profileError`;
export const RESET_PROFILE_FLAG = `${name}/resetProfileFlag`;

export type Profile = {
    id: number;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    company: string;
    about: string;
    avatar: string;
    created_at: string;
    updated_at: string;
}

export type InitialStateProfile = {
    error: string;
    success: string;
    user: Profile | null;
}