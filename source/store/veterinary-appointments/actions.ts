import { createAction } from '@reduxjs/toolkit';

import {
    ADD_NEW_VETERINARY_APPOINTMENT,
    ADD_VETERINARY_APPOINTMENT_FAIL,
    ADD_VETERINARY_APPOINTMENT_SUCCESS,
    DELETE_VETERINARY_APPOINTMENT,
    DELETE_VETERINARY_APPOINTMENT_FAIL,
    DELETE_VETERINARY_APPOINTMENT_SUCCESS,
    GET_VETERINARY_APPOINTMENTS,
    UPDATE_VETERINARY_APPOINTMENT,
    UPDATE_VETERINARY_APPOINTMENT_FAIL,
    UPDATE_VETERINARY_APPOINTMENT_SUCCESS
} from './types';

export const getVeterinaryAppointments = createAction(GET_VETERINARY_APPOINTMENTS);
export const updateVeterinaryAppointment = createAction<{ [key: string]: any }>(UPDATE_VETERINARY_APPOINTMENT);
export const updateVeterinaryAppointmentSuccess = createAction<{ [key: string]: any }>(UPDATE_VETERINARY_APPOINTMENT_SUCCESS);
export const updateVeterinaryAppointmentFail = createAction<string>(UPDATE_VETERINARY_APPOINTMENT_FAIL);
export const addNewVeterinaryAppointment = createAction<{ [key: string]: any }>(ADD_NEW_VETERINARY_APPOINTMENT);
export const addVeterinaryAppointmentSuccess = createAction<{ [key: string]: any }>(ADD_VETERINARY_APPOINTMENT_SUCCESS);
export const addVeterinaryAppointmentFail = createAction<string>(ADD_VETERINARY_APPOINTMENT_FAIL);
export const deleteVeterinaryAppointment = createAction<{ [key: string]: any }>(DELETE_VETERINARY_APPOINTMENT);
export const deleteVeterinaryAppointmentSuccess = createAction<{ [key: string]: any }>(DELETE_VETERINARY_APPOINTMENT_SUCCESS);
export const deleteVeterinaryAppointmentFail = createAction<string>(DELETE_VETERINARY_APPOINTMENT_FAIL);
