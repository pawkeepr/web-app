import { api } from '../api'

const TYPE_USER = {
    tutor: 'tutor',
    veterinary: 'vet',
} as const
export type TYPE_USER = (typeof TYPE_USER)[keyof typeof TYPE_USER]

type ENUM_HOSPITALIZATIONS = 'hospitalizations' | 'internments' | 'surgeries'
type ENUM_DISEASES = 'diseases' | 'allergies' | 'injuries'

const urls = {
    MEDICAL_RECORDS_FETCH_ALL_BY_PET: () =>
        '/api-medical/search-medical-record-pet',
    MEDICAL_RECORDS_GET_BY_TUTOR: () =>
        '/api-medical/fetch-all-medical-records-tutor',
    MEDICAL_RECORDS_UPDATE: (type: ENUM_DISEASES, user: TYPE_USER) =>
        `/api-medical/update-list/${type}/${user}`,
    MEDICAL_RECORDS_UPDATE_BODY_EVOLUTION: (user: TYPE_USER) =>
        `/api-medical/update-list-body-evolution/${user}`,
    MEDICAL_RECORDS_UPDATE_MEDICINES: (user: TYPE_USER) =>
        `/api-medical/update-list-medicines/${user}`,
    MEDICAL_RECORDS_UPDATE_EXAMS: (user: TYPE_USER) =>
        `/api-medical/update-list-exams-tests/${user}`,
    MEDICAL_RECORDS_UPDATE_NUTRITIONS: (user: TYPE_USER) =>
        `/api-medical/update-list-nutritions/${user}`,
    MEDICAL_RECORDS_UPDATE_VACCINES: (user: TYPE_USER) =>
        `/api-medical/update-list-vacine/${user}`,
    MEDICAL_RECORDS_UPDATE_PHYSICAL_ACTIVITIES: (user: TYPE_USER) =>
        `/api-medical/update-list-physical-activities/${user}`,
    MEDICAL_RECORDS_UPDATE_DENTAL_PROCEDURES: (user: TYPE_USER) =>
        `/api-medical/update-list-dental-procedures/${user}`,
    MEDICAL_RECORDS_UPDATE_HOSPITALIZATIONS: (
        type: ENUM_HOSPITALIZATIONS,
        user: TYPE_USER,
    ) => `/api-medical/update-list-hosp/${type}/${user}`,
}

export const getAllMedicalRecordsByPet = async (cpf_cnpj: string, id_pet: string) =>
    api.get(urls.MEDICAL_RECORDS_FETCH_ALL_BY_PET(), {
        params: { cpf_cnpj, id_pet },
    })
export const getMedicalRecordsByTutor = async (cpf_cnpj: string) =>
    api.get(urls.MEDICAL_RECORDS_GET_BY_TUTOR(), { params: { cpf_cnpj } })

export const updateBodyEvolution = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_BODY_EVOLUTION(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateHospitalizations = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(
        urls.MEDICAL_RECORDS_UPDATE_HOSPITALIZATIONS('hospitalizations', user),
        data,
        {
            params: { cpf_cnpj, id_pet },
        },
    )
export const updateVaccines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_VACCINES(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateMedicines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_MEDICINES(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateSurgeries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_HOSPITALIZATIONS('surgeries', user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateExams = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_EXAMS(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateInternments = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(
        urls.MEDICAL_RECORDS_UPDATE_HOSPITALIZATIONS('internments', user),
        data,
        {
            params: { cpf_cnpj, id_pet },
        },
    )
export const updateInjuries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('injuries', user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateAllergies = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('allergies', user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateDiseases = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('diseases', user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateDentalProcedures = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_DENTAL_PROCEDURES(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateNutritions = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_NUTRITIONS(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updatePhysicalActivities = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_PHYSICAL_ACTIVITIES(user), data, {
        params: { cpf_cnpj, id_pet },
    })
