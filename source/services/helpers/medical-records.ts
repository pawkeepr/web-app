import type {
    BodyEvolution,
    DentalProcedure,
    Disease,
    ExamTest,
    Hospitalization,
    Medicine,
    Nutrition,
    PhysicalActivity,
    Vaccine,
} from '~/types/medical-records'
import { api } from '../api'

const TYPE_USER = {
    tutor: 'tutor',
    veterinary: 'vet',
} as const
export type TYPE_USER = (typeof TYPE_USER)[keyof typeof TYPE_USER]

type ENUM_HOSPITALIZATIONS = 'hospitalizations' | 'internments' | 'surgeries'
type ENUM_DISEASES = 'diseases' | 'allergies' | 'injuries'

const urls = {
    vaccines: {
        update: (user: TYPE_USER) => `/api-medical/update-list-vacine/${user}`,
        insert: (user: TYPE_USER) => `/api-medical/insert-list-vaccine/${user}`,
        delete: (user: TYPE_USER) => `/api-medical/delete-list-vaccine/${user}`,
    },
    medicines: {
        update: (user: TYPE_USER) => `/api-medical/update-list-medicines/${user}`,
        insert: (user: TYPE_USER) => `/api-medical/insert-list-medicine/${user}`,
        delete: (user: TYPE_USER) => `/api-medical/delete-list-medicine/${user}`,
    },
    nutritions: {
        update: (user: TYPE_USER) => `/api-medical/update-list-nutritions/${user}`,
        insert: (user: TYPE_USER) => `/api-medical/insert-list-nutritions/${user}`,
        delete: (user: TYPE_USER) => `/api-medical/delete-list-nutritions/${user}`,
    },
    exams: {
        update: (user: TYPE_USER) => `/api-medical/update-list-exams-tests/${user}`,
        insert: (user: TYPE_USER) => `/api-medical/insert-list-exams-tests/${user}`,
        delete: (user: TYPE_USER) => `/api-medical/delete-list-exams-tests/${user}`,
    },
    bodyEvolution: {
        update: (user: TYPE_USER) =>
            `/api-medical/update-list-body-evolution/${user}`,
        insert: (user: TYPE_USER) =>
            `/api-medical/insert-list-body-evolution/${user}`,
        delete: (user: TYPE_USER) =>
            `/api-medical/delete-list-body-evolution/${user}`,
    },
    dental_procedures: {
        update: (user: TYPE_USER) =>
            `/api-medical/update-list-dental-procedures/${user}`,
        insert: (user: TYPE_USER) =>
            `/api-medical/insert-list-dental-procedures/${user}`,
        delete: (user: TYPE_USER) =>
            `/api-medical/delete-list-dental-procedures/${user}`,
    },
    physical_activities: {
        update: (user: TYPE_USER) =>
            `/api-medical/update-list-physical-activities/${user}`,
        insert: (user: TYPE_USER) =>
            `/api-medical/insert-list-physical-activities/${user}`,
        delete: (user: TYPE_USER) =>
            `/api-medical/delete-list-physical-activities/${user}`,
    },
    hospitalizations: {
        update: (user: TYPE_USER, type: ENUM_HOSPITALIZATIONS) =>
            `/api-medical/update-list-hosp/${type}/${user}`,
        insert: (user: TYPE_USER, type: ENUM_HOSPITALIZATIONS) =>
            `/api-medical/insert-list-hosp/${type}/${user}`,
        delete: (user: TYPE_USER, type: ENUM_HOSPITALIZATIONS) =>
            `/api-medical/delete-list-hosp/${type}/${user}`,
    },
    diseases: {
        update: (user: TYPE_USER, type: ENUM_DISEASES) =>
            `/api-medical/update-list/${type}/${user}`,
        insert: (user: TYPE_USER, type: ENUM_DISEASES) =>
            `/api-medical/insert-list/${type}/${user}`,
        delete: (user: TYPE_USER, type: ENUM_DISEASES) =>
            `/api-medical/delete-list/${type}/${user}`,
    },
    MEDICAL_RECORDS_FETCH_ALL_BY_PET: () =>
        '/api-medical/search-medical-record-pet',
    MEDICAL_RECORDS_GET_BY_TUTOR: () =>
        '/api-medical/fetch-all-medical-records-tutor',
}

export const getAllMedicalRecordsByPet = async (cpf_cnpj: string, id_pet: string) =>
    api.get(urls.MEDICAL_RECORDS_FETCH_ALL_BY_PET(), {
        params: { cpf_cnpj, id_pet },
    })
export const getMedicalRecordsByTutor = async (cpf_cnpj: string) =>
    api.get(urls.MEDICAL_RECORDS_GET_BY_TUTOR(), { params: { cpf_cnpj } })

export const insertBodyEvolution = async (
    data: BodyEvolution,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.bodyEvolution.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateBodyEvolution = async (
    data: BodyEvolution,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.bodyEvolution.update(user), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteBodyEvolution = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.bodyEvolution.delete(user), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertHospitalizations = async (
    data: Hospitalization,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.hospitalizations.insert(user, 'hospitalizations'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateHospitalizations = async (
    data: Hospitalization,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.hospitalizations.update(user, 'hospitalizations'), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteHospitalizations = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.hospitalizations.delete(user, 'hospitalizations'), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertVaccines = async (
    data: Vaccine,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.vaccines.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateVaccines = async (
    data: Vaccine,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.vaccines.update(user), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteVaccines = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.vaccines.delete(user), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertMedicines = async (
    data: Medicine,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.medicines.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateMedicines = async (
    data: Medicine,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.medicines.update(user), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteMedicines = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.medicines.delete(user), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertSurgeries = async (
    data: Hospitalization,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.hospitalizations.insert(user, 'surgeries'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateSurgeries = async (
    data: Hospitalization,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.hospitalizations.update(user, 'surgeries'), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteSurgeries = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.hospitalizations.delete(user, 'surgeries'), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertExams = async (
    data: ExamTest,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.exams.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateExams = async (
    data: ExamTest,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.exams.update(user), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteExams = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.exams.delete(user), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertInternments = async (
    data: Hospitalization,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.hospitalizations.insert(user, 'internments'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateInternments = async (
    data: Hospitalization,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.hospitalizations.update(user, 'internments'), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteInternments = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.hospitalizations.delete(user, 'internments'), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertInjuries = async (
    data: Disease,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.diseases.insert(user, 'injuries'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateInjuries = async (
    data: Disease,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.diseases.update(user, 'injuries'), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteInjuries = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.diseases.delete(user, 'injuries'), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertAllergies = async (
    data: Disease,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.diseases.insert(user, 'allergies'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateAllergies = async (
    data: Disease,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.diseases.update(user, 'allergies'), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteAllergies = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.diseases.delete(user, 'allergies'), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertDiseases = async (
    data: Disease,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.diseases.insert(user, 'diseases'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateDiseases = async (
    data: Disease,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.diseases.update(user, 'diseases'), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteDiseases = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.diseases.delete(user, 'diseases'), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertDentalProcedures = async (
    data: DentalProcedure,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.dental_procedures.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateDentalProcedures = async (
    data: DentalProcedure,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.dental_procedures.update(user), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteDentalProcedures = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.dental_procedures.delete(user), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertNutritions = async (
    data: Nutrition,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.nutritions.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateNutritions = async (
    data: Nutrition,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.nutritions.update(user), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deleteNutritions = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.nutritions.delete(user), {
        params: { cpf_cnpj, id_pet, id_object },
    })

export const insertPhysicalActivities = async (
    data: PhysicalActivity,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.physical_activities.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updatePhysicalActivities = async (
    data: PhysicalActivity,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.physical_activities.update(user), data, {
        params: { cpf_cnpj, id_pet, id_object: data.id },
    })

export const deletePhysicalActivities = async (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.physical_activities.delete(user), {
        params: { cpf_cnpj, id_pet, id_object },
    })
