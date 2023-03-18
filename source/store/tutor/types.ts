export const name = "Tutor"

export const GET_CONTACTS = `${name}/getContacts`;
export const UPDATE_CONTACT = `${name}/updateContact`;
export const UPDATE_CONTACT_SUCCESS = `${name}/updateContactSuccess`;
export const UPDATE_CONTACT_FAIL = `${name}/updateContactFail`;
export const ADD_NEW_CONTACT = `${name}/addNewContact`;
export const ADD_CONTACT_SUCCESS = `${name}/addContactSuccess`;
export const ADD_CONTACT_FAIL = `${name}/addContactFail`;
export const DELETE_CONTACT = `${name}/deleteContact`;
export const DELETE_CONTACT_SUCCESS = `${name}/deleteContactSuccess`;
export const DELETE_CONTACT_FAIL = `${name}/deleteContactFail`;
export const CRM_API_RESPONSE_SUCCESS = `${name}/crmApiResponseSuccess`;
export const CRM_API_RESPONSE_ERROR = `${name}/crmApiResponseError`;


type Tutor = {
    _id: string,
}

export type TutorInitialState = {
    tutors: Array<Tutor>,
    error: any,
    isContactCreated: boolean,
    isContactSuccess: boolean,
};