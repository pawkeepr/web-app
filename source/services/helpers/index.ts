import { api } from '../api'

import type { VeterinaryConsultation } from '~/types/appointment'
import type { IPetV2 } from '~/types/pet-v2'
import type { IProfile } from '~/types/profile'
import * as urls from './urls'

export const createProfileVet = async (data: IProfile) =>
    api.post(urls.VET_CREATE_PROFILE(), data)
export const updateProfileVet = async (data: IProfile, user_id: string) =>
    api.put(urls.VET_UPDATE_PROFILE(), data, { params: { user_id } })
export const getVetProfile = async (app = api) => app.get(urls.VET_GET_PROFILE())

export const getAllAppointmentsVet = async () => api.get(urls.APPOINTMENT_GET_ALL())
export const getAppointmentVet = async (id_appointment: string) =>
    api.get(urls.APPOINTMENT_GET_BY_ID(), { params: { id_appointment } })
export const createAppointmentVet = async (data: any) =>
    api.post(urls.APPOINTMENT_CREATE(), data)
export const finishedAppointmentVet = async (id_appointment: string, data: any) =>
    api.put(urls.APPOINTMENT_FINISHED(), data, { params: { id_appointment } })

export const createScheduled = async (data: any) =>
    api.post(urls.SCHEDULED_CREATE(), data)

export const createProfileTutor = async (data: IProfile) =>
    api.post(urls.TUTOR_CREATE_PROFILE(), data)
export const updateProfileTutor = async (data: IProfile, user_id: string) =>
    api.post(urls.TUTOR_UPDATE_PROFILE(), data, { params: { user_id } })
export const getTutorProfile = async () => api.get(urls.TUTOR_GET_PROFILE())

export const getAllPets = async (cpf_cnpj: string) =>
    api.get(urls.PET_FETCH_ALL(), { params: { cpf_cnpj } })
export const getAllAppointmentsDonePet = async (id_pet: string) =>
    api.get(urls.PET_FETCH_ALL_APPOINTMENTS_DONE(), { params: { id_pet } })
export const getPet = async (cpf_cnpj: string, id_pet: string) =>
    api.get(urls.PET_GET_PROFILE(), { params: { id_pet, cpf_cnpj } })
export const createPet = async (data: any) =>
    api.post(urls.PET_CREATE_PROFILE(), data)
export const createPetSimplified = async (data: any) =>
    api.post(urls.PET_CREATE_SIMPLIFIED_PROFILE(), data)
export const updatePet = async (
    cpf_cnpj: string,
    id_pet: string,
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    { veterinary, id, ...pet }: IPetV2,
) =>
    api.put(urls.PET_UPDATE_PROFILE(), pet, {
        params: { id_pet, cpf_cnpj },
    })
export const updateHealthPet = async (
    data: any,
    cpf_cnpj: string,
    id_pet: string,
) => api.post(urls.PET_UPDATE_HEALTH(), data, { params: { id_pet, cpf_cnpj } })

export const sendMessageWhatsapp = async (data: any) =>
    api.post(urls.WHATSAPP_SEND_MESSAGE(), data)

export const getAllAppointmentsDone = async () =>
    api.get(urls.APPOINTMENT_GET_ALL_DONE())
export const getAllAppointmentsCanceled = async () =>
    api.get(urls.APPOINTMENT_GET_ALL_CANCELED())
export const getAllAppointmentsScheduled = async () =>
    api.get(urls.APPOINTMENT_GET_ALL_SCHEDULED())
export const getAllAppointmentsRescheduled = async () =>
    api.get(urls.APPOINTMENT_GET_ALL_RESCHEDULED())
export const getAllAppointmentsConfirmed = async () =>
    api.get(urls.APPOINTMENT_GET_ALL_CONFIRMED())

export type IDateConsult = Pick<VeterinaryConsultation, 'dates_consults'>

export const updateAppointmentConfirmed = async (
    id_appointment: string,
    data: IDateConsult,
) => api.put(urls.APPOINTMENT_UPDATE_CONFIRMED(id_appointment), data)
export const updateAppointmentCanceled = async (
    id_appointment: string,
    data: IDateConsult,
) => api.put(urls.APPOINTMENT_UPDATE_CANCELED(id_appointment), data)
export const updateAppointmentRescheduled = async (
    id_appointment: string,
    data: IDateConsult,
) => api.put(urls.APPOINTMENT_UPDATE_RESCHEDULED(id_appointment), data)

export const createScheduledVet = async (data: any) =>
    api.post(urls.APPOINTMENT_CREATE_SCHEDULED_VET(), data)

export const getAllPetsOfClinic = async () => api.get(urls.PET_FETCH_ALL_CLINIC())
export const getAllTutorsOfClinic = async () =>
    api.get(urls.TUTORS_FETCH_ALL_CLINIC())

export type FnAxiosAppointmentByIdExternal = (
    id_appointment: string,
) => Promise<unknown>

export const getAppointmentExternalByID: FnAxiosAppointmentByIdExternal = async (
    id_appointment: string,
) =>
    api.get(urls.APPOINTMENT_GET_BY_ID_EXTERNAL(), {
        params: { id_appointment },
    })

export const confirmedAppointmentExternal: FnAxiosAppointmentByIdExternal = async (
    id_appointment: string,
) =>
    api.put(urls.APPOINTMENT_CONFIRMED_EXTERNAL(), undefined, {
        params: { id_appointment },
    })

export const canceledAppointmentExternal: FnAxiosAppointmentByIdExternal = async (
    id_appointment: string,
) =>
    api.put(urls.APPOINTMENT_CANCELED_EXTERNAL(), undefined, {
        params: { id_appointment },
    })

export const getAllPetsOfTutors: FnAxiosAppointmentByIdExternal = async (
    cpf_cnpj: string,
) => api.get(urls.PET_FETCH_ALL(), { params: { cpf_cnpj } })
export const getAllVetsOfTutors: FnAxiosAppointmentByIdExternal = async (
    cpf_cnpj: string,
) => api.get(urls.VET_FETCH_ALL_TUTORS(), { params: { cpf_cnpj } })
