// Appointment Vet
export const APPOINTMENT_GET_ALL = () => '/api-appointment/fetch-all-appointment-vet'
export const APPOINTMENT_UPDATE = () => '/api-appointment/update-appointment'
export const APPOINTMENT_CREATE = () => '/api-appointment/create-appointment'
export const APPOINTMENT_GET_BY_ID = () => '/api-appointment/search-appointment'

// Schedule Vet
export const SCHEDULED_CREATE = () => '/api-appointment/create-schedule'

// Profile Vet

export const VET_CREATE_PROFILE = () => '/api-user/create-user-vet'
export const VET_GET_PROFILE = () => '/api-user/search-user-vet'
export const VET_UPDATE_PROFILE = () => '/api-user/update-user-vet'

// Profile Tutor

export const TUTOR_CREATE_PROFILE = () => '/api-user-tutor/create-user-tutor'
export const TUTOR_GET_PROFILE = () => '/api-user-tutor/search-user-tutor'
export const TUTOR_UPDATE_PROFILE = () => '/api-user-tutor/update-user-tutor'

// Pet

export const PET_FETCH_ALL = () => '/api-pet/fetch-all-pets-tutor'
export const PET_CREATE_PROFILE = () => '/api-pet/create-pet'
export const PET_GET_PROFILE = () => '/api-pet/search-pet'
export const PET_UPDATE_PROFILE = () => '/api-pet/update-pet'
export const PET_UPDATE_HEALTH = () => '/api-pet/update-pet-health'

// whatsapp

export const WHATSAPP_SEND_MESSAGE = () => "/2010-04-01/Accounts/ACb33f50f8531ffd88ddace8c7a84c10d7/Messages/SM4668463cf786f5123705e3675c00f8aa.json"

// Appointment Vet

export const APPOINTMENT_GET_ALL_DONE = () => '/api-appointment/fetch-all-appointment-done-vet'
export const APPOINTMENT_GET_ALL_CANCELED = () => '/api-appointment/fetch-all-appointment-canceled-vet'
export const APPOINTMENT_GET_ALL_SCHEDULED = () => '/api-appointment/fetch-all-appointment-scheduled-vet'
export const APPOINTMENT_GET_ALL_CONFIRMED = () => '/api-appointment/fetch-all-appointment-confirmed-vet'


// Appointment Update

export const APPOINTMENT_UPDATE_CONFIRMED = (id_appointment: string) => `/api-appointment/update-confirmed-appointment?id_appointment=${id_appointment}`
export const APPOINTMENT_UPDATE_CANCELED = (id_appointment: string) => `/api-appointment/update-canceled-appointment?id_appointment=${id_appointment}`
export const APPOINTMENT_UPDATE_RESCHEDULED = (id_appointment: string) => `/api-appointment/update-rescheduled-appointment?id_appointment=${id_appointment}`

// Appointment 

export const APPOINTMENT_CREATE_SCHEDULED_VET = () => '/api-appointment/create-scheduled-vet'