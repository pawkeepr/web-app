import { createAction } from '@reduxjs/toolkit';

import {
    ADD_NEW_TUTOR,
    ADD_TUTOR_FAIL,
    ADD_TUTOR_SUCCESS,
    CRM_API_RESPONSE_ERROR,
    CRM_API_RESPONSE_SUCCESS,
    DELETE_TUTOR,
    DELETE_TUTOR_FAIL,
    DELETE_TUTOR_SUCCESS,
    GET_TUTORS,
    UPDATE_TUTOR,
    UPDATE_TUTOR_FAIL,
    UPDATE_TUTOR_SUCCESS
} from './types';

export const getTutors = createAction(GET_TUTORS);
export const updateTutor = createAction<{ [key: string]: any }>(UPDATE_TUTOR);
export const updateTutorSuccess = createAction<{ [key: string]: any }>(UPDATE_TUTOR_SUCCESS);
export const updateTutorFail = createAction<string>(UPDATE_TUTOR_FAIL);
export const addNewTutor = createAction<{ [key: string]: any }>(ADD_NEW_TUTOR);
export const addTutorSuccess = createAction<{ [key: string]: any }>(ADD_TUTOR_SUCCESS);
export const addTutorFail = createAction<string>(ADD_TUTOR_FAIL);
export const deleteTutor = createAction<{ [key: string]: any }>(DELETE_TUTOR);
export const deleteTutorSuccess = createAction<{ [key: string]: any }>(DELETE_TUTOR_SUCCESS);
export const deleteTutorFail = createAction<string>(DELETE_TUTOR_FAIL);

export const apiResponseSuccess = createAction<{ [key: string]: any }>(CRM_API_RESPONSE_SUCCESS);
export const apiResponseError = createAction<string>(CRM_API_RESPONSE_ERROR);


