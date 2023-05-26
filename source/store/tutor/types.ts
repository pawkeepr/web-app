export const name = "Tutor"

export const GET_TUTORS = `${name}/getTutors`;
export const UPDATE_TUTOR = `${name}/updateTutor`;
export const UPDATE_TUTOR_SUCCESS = `${name}/updateTutorSuccess`;
export const UPDATE_TUTOR_FAIL = `${name}/updateTutorFail`;
export const ADD_NEW_TUTOR = `${name}/addNewTutor`;
export const ADD_TUTOR_SUCCESS = `${name}/addTutorSuccess`;
export const ADD_TUTOR_FAIL = `${name}/addTutorFail`;
export const DELETE_TUTOR = `${name}/deleteTutor`;
export const DELETE_TUTOR_SUCCESS = `${name}/deleteTutorSuccess`;
export const DELETE_TUTOR_FAIL = `${name}/deleteTutorFail`;
export const CRM_API_RESPONSE_SUCCESS = `${name}/apiResponseSuccess`;
export const CRM_API_RESPONSE_ERROR = `${name}/apiResponseError`;

export const GET_TUTORS_BY_DOCUMENT = `${name}/getTutorsByDocument`;

export type Tutor = {
    id: string;
    name: string;
    email: string;
    document: string;
    created_at: string;
    updated_at: string;
    avatar: string;
    phone: string;
    address: {
        zipCode: string;
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
        state: string;
    }
}

export type TutorInitialState = {
    tutors: Array<Tutor>,
    error: any,
    isTutorCreated: boolean,
    isTutorSuccess: boolean,
};