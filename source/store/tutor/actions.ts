import { createAction } from '@reduxjs/toolkit';

import {
    ADD_CONTACT_FAIL,
    ADD_CONTACT_SUCCESS,
    ADD_NEW_CONTACT,
    CRM_API_RESPONSE_ERROR,
    CRM_API_RESPONSE_SUCCESS,
    DELETE_CONTACT,
    DELETE_CONTACT_FAIL,
    DELETE_CONTACT_SUCCESS,
    GET_CONTACTS,
    UPDATE_CONTACT,
    UPDATE_CONTACT_FAIL,
    UPDATE_CONTACT_SUCCESS
} from './types';

export const getContacts = createAction(GET_CONTACTS);
export const updateContact = createAction<{ [key: string]: any }>(UPDATE_CONTACT);
export const updateContactSuccess = createAction<{ [key: string]: any }>(UPDATE_CONTACT_SUCCESS);
export const updateContactFail = createAction<string>(UPDATE_CONTACT_FAIL);
export const addNewContact = createAction<{ [key: string]: any }>(ADD_NEW_CONTACT);
export const addContactSuccess = createAction<{ [key: string]: any }>(ADD_CONTACT_SUCCESS);
export const addContactFail = createAction<string>(ADD_CONTACT_FAIL);
export const deleteContact = createAction<{ [key: string]: any }>(DELETE_CONTACT);
export const deleteContactSuccess = createAction<{ [key: string]: any }>(DELETE_CONTACT_SUCCESS);
export const deleteContactFail = createAction<string>(DELETE_CONTACT_FAIL);

export const crmApiResponseSuccess = createAction<{ [key: string]: any }>(CRM_API_RESPONSE_SUCCESS);
export const crmApiResponseError = createAction<string>(CRM_API_RESPONSE_ERROR);