import { api } from '../api'

const urls = {
    MEDICAL_RECORDS_FETCH_ALL_BY_PET: () =>
        '/api-medical/search-medical-record-pet',
    MEDICAL_RECORDS_GET_BY_TUTOR: () =>
        '/api-medical/fetch-all-medical-records-tutor',
    MEDICAL_RECORDS_UPDATE_BODY_EVOLUTION: () =>
        '/api-medical/update-list-body-evolution',
    MEDICAL_RECORDS_UPDATE_HOSPITALIZATIONS: () =>
        '/api-medical/update-list-hospitalizations',
    MEDICAL_RECORDS_UPDATE_VACCINES: () => '/api-medical/update-list-vaccines',
    MEDICAL_RECORDS_UPDATE_MEDICINES: () => '/api-medical/update-list-medicines',
    MEDICAL_RECORDS_UPDATE_SURGERIES: () => '/api-medical/update-list-surgeries',
    MEDICAL_RECORDS_UPDATE_EXAMS: () => '/api-medical/update-list-exams-tests',
    MEDICAL_RECORDS_UPDATE_INTERNMENTS: () =>
        '/api-medical/update-list-internments',
    MEDICAL_RECORDS_UPDATE_INJURIES: () => '/api-medical/update-list-injuries',
    MEDICAL_RECORDS_UPDATE_ALLERGIES: () => '/api-medical/update-list-allergies',
    MEDICAL_RECORDS_UPDATE_DISEASES: () => '/api-medical/update-list-diseases',
    MEDICAL_RECORDS_UPDATE_DENTAL_PROCEDURES: () =>
        '/api-medical/update-list-dental-procedures',
    MEDICAL_RECORDS_UPDATE_NUTRITIONS: () => '/api-medical/update-list-nutritions',
    MEDICAL_RECORDS_PHYSICAL_ACTIVITIES: () =>
        '/api-medical/update-list-physical-activities',
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
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_BODY_EVOLUTION(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateHospitalizations = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_HOSPITALIZATIONS(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateVaccines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_VACCINES(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateMedicines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_MEDICINES(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateSurgeries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_SURGERIES(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateExams = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_EXAMS(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateInternments = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_INTERNMENTS(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateInjuries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_INJURIES(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateAllergies = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_ALLERGIES(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateDiseases = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_DISEASES(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateDentalProcedures = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_DENTAL_PROCEDURES(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateNutritions = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE_NUTRITIONS(), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updatePhysicalActivities = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_PHYSICAL_ACTIVITIES(), data, {
        params: { cpf_cnpj, id_pet },
    })
