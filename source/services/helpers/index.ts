
import { api } from '../api';

import { IAppointmentVet, IAppointmentVetData } from '~/store/slices/appointment-vet/types';
import { IProfile } from '~/types/profile';
import * as urls from './urls';

export const createProfileVet = async (data: IProfile) => api.post(urls.VET_CREATE_PROFILE(), data);
export const updateProfileVet = async (data: IProfile, user_id: string) => api.put(urls.VET_UPDATE_PROFILE(), data, { params: { user_id } });
export const getVetProfile = async () => api.get(urls.VET_GET_PROFILE());

export const getAllAppointmentsVet = async () => api.get<IAppointmentVetData[]>(urls.APPOINTMENT_GET_ALL());
export const getAppointmentVet = async (id_appointment: string) => api.get(urls.APPOINTMENT_GET_BY_ID(), { params: { id_appointment } });
export const createAppointmentVet = async (data: any) => api.post(urls.APPOINTMENT_CREATE(), data);
export const finishedAppointmentVet = async (id_appointment: string, data: any) => api.put(urls.APPOINTMENT_FINISHED(), data, { params: { id_appointment } });

export const createScheduled = async (data: any,) => api.post(urls.SCHEDULED_CREATE(), data);

export const createProfileTutor = async (data: IProfile) => api.post(urls.TUTOR_CREATE_PROFILE(), data);
export const updateProfileTutor = async (data: IProfile, user_id: string) => api.post(urls.TUTOR_UPDATE_PROFILE(), data, { params: { user_id } });
export const getTutorProfile = async () => api.get(urls.TUTOR_GET_PROFILE());

export const getAllPets = async (cpf_tutor: string) => api.get(urls.PET_FETCH_ALL(), { params: { cpf_tutor } });
export const getPet = async (cpf_tutor: string, id_pet: string) => api.get(urls.PET_GET_PROFILE(), { params: { id_pet, cpf_tutor } });
export const createPet = async (data: any,) => api.post(urls.PET_CREATE_PROFILE(), data);
export const updatePet = async (data: any, cpf_tutor: string, id_pet: string) => api.post(urls.PET_UPDATE_PROFILE(), data, { params: { id_pet, cpf_tutor } });
export const updateHealthPet = async (data: any, cpf_tutor: string, id_pet: string) => api.post(urls.PET_UPDATE_HEALTH(), data, { params: { id_pet, cpf_tutor } });

export const sendMessageWhatsapp = async (data: any) => api.post(urls.WHATSAPP_SEND_MESSAGE(), data);


export const getAllAppointmentsDone = async () => api.get(urls.APPOINTMENT_GET_ALL_DONE());
export const getAllAppointmentsCanceled = async () => api.get(urls.APPOINTMENT_GET_ALL_CANCELED());
export const getAllAppointmentsScheduled = async () => api.get(urls.APPOINTMENT_GET_ALL_SCHEDULED());
export const getAllAppointmentsRescheduled = async () => api.get(urls.APPOINTMENT_GET_ALL_RESCHEDULED());
export const getAllAppointmentsConfirmed = async () => api.get(urls.APPOINTMENT_GET_ALL_CONFIRMED());

type IDateConsult = Pick<IAppointmentVet, 'dates_consults'>

export const updateAppointmentConfirmed = async (id_appointment: string, data: IDateConsult) => api.put(urls.APPOINTMENT_UPDATE_CONFIRMED(id_appointment), data);
export const updateAppointmentCanceled = async (id_appointment: string, data: IDateConsult) => api.put(urls.APPOINTMENT_UPDATE_CANCELED(id_appointment), data);
export const updateAppointmentRescheduled = async (id_appointment: string, data: IDateConsult) => api.put(urls.APPOINTMENT_UPDATE_RESCHEDULED(id_appointment), data);

export const createScheduledVet = async (data: any) => api.post(urls.APPOINTMENT_CREATE_SCHEDULED_VET(), data);