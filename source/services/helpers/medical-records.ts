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
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.bodyEvolution.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateBodyEvolution = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.bodyEvolution.update(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteBodyEvolution = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) => api.delete(urls.bodyEvolution.delete(user))

export const insertHospitalizations = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.hospitalizations.insert(user, 'hospitalizations'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateHospitalizations = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.hospitalizations.update(user, 'hospitalizations'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteHospitalizations = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.hospitalizations.delete(user, 'hospitalizations'), {
        data,
        params: { cpf_cnpj, id_pet },
    })

export const insertVaccines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.vaccines.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateVaccines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.vaccines.update(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteVaccines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.vaccines.delete(user), {
        data,
        params: { cpf_cnpj, id_pet },
    })

export const insertMedicines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.medicines.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateMedicines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.medicines.update(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteMedicines = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.medicines.delete(user), {
        data,
        params: { cpf_cnpj, id_pet },
    })

export const insertSurgeries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.hospitalizations.insert(user, 'surgeries'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateSurgeries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.hospitalizations.update(user, 'surgeries'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteSurgeries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.hospitalizations.delete(user, 'surgeries'), {
        data,
        params: { cpf_cnpj, id_pet },
    })

export const insertExams = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.exams.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateExams = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.exams.update(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteExams = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.exams.delete(user), {
        data,
        params: { cpf_cnpj, id_pet },
    })

export const insertInternments = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.hospitalizations.insert(user, 'internments'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateInternments = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.hospitalizations.update(user, 'internments'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteInternments = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.hospitalizations.delete(user, 'internments'), {
        data,
        params: { cpf_cnpj, id_pet },
    })

export const insertInjuries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.diseases.insert(user, 'injuries'), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateInjuries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.diseases.update(user, 'injuries'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteInjuries = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.diseases.delete(user, 'injuries'), {
        data,
        params: { cpf_cnpj, id_pet },
    })

export const insertAllergies = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.diseases.insert(user, 'allergies'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateAllergies = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.diseases.update(user, 'allergies'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteAllergies = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.diseases.delete(user, 'allergies'), {
        data,
        params: { cpf_cnpj, id_pet },
    })

export const insertDiseases = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.diseases.insert(user, 'diseases'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updateDiseases = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.diseases.update(user, 'diseases'), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteDiseases = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.diseases.delete(user, 'diseases'), {
        data,
        params: { cpf_cnpj, id_pet },
    })

export const insertDentalProcedures = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.dental_procedures.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateDentalProcedures = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.dental_procedures.update(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteDentalProcedures = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.dental_procedures.delete(user), {
        data,
        params: { cpf_cnpj, id_pet },
    })

export const insertNutritions = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.nutritions.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })
export const updateNutritions = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.nutritions.update(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deleteNutritions = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.nutritions.delete(user), {
        data,
        params: { cpf_cnpj, id_pet },
    })

export const insertPhysicalActivities = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.post(urls.physical_activities.insert(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const updatePhysicalActivities = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.put(urls.physical_activities.update(user), data, {
        params: { cpf_cnpj, id_pet },
    })

export const deletePhysicalActivities = async (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) =>
    api.delete(urls.physical_activities.delete(user), {
        data,
        params: { cpf_cnpj, id_pet },
    })
