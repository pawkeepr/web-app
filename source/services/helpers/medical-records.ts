import type { MEDICAL_RECORDS } from '~/types/medical-records'
import { api } from '../api'

const urls = {
    MEDICAL_RECORDS_FETCH_ALL_BY_PET: () =>
        '/api-medical/search-medical-record-pet',
    MEDICAL_RECORDS_GET_BY_TUTOR: () =>
        '/api-medical/fetch-all-medical-records-tutor',
    MEDICAL_RECORDS_UPDATE: (type: MEDICAL_RECORDS) =>
        `/api-medical/update-medical/${type}`,
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
    api.put(urls.MEDICAL_RECORDS_UPDATE('body-evolution'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateHospitalizations = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('hospitalizations'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateVaccines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('vaccines'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateMedicines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('medicines'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateSurgeries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('surgeries'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateExams = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('exams'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateInternments = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('internments'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateInjuries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('injuries'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateAllergies = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('allergies'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateDiseases = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('diseases'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateDentalProcedures = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('dental-procedures'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateNutritions = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('nutritions'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updatePhysicalActivities = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) =>
    api.put(urls.MEDICAL_RECORDS_UPDATE('physical-activities'), data, {
        params: { cpf_cnpj, id_pet },
    })
