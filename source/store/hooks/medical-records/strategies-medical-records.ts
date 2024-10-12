import type { AxiosResponse } from 'axios'
import {
    deleteAllergies,
    deleteBodyEvolution,
    deleteDentalProcedures,
    deleteDiseases,
    deleteExams,
    deleteHospitalizations,
    deleteInjuries,
    deleteInternments,
    deleteMedicines,
    deleteNutritions,
    deletePhysicalActivities,
    deleteSurgeries,
    deleteVaccines,
    insertAllergies,
    insertBodyEvolution,
    insertDentalProcedures,
    insertDiseases,
    insertExams,
    insertHospitalizations,
    insertInjuries,
    insertInternments,
    insertMedicines,
    insertNutritions,
    insertPhysicalActivities,
    insertSurgeries,
    insertVaccines,
    updateAllergies,
    updateBodyEvolution,
    updateDentalProcedures,
    updateDiseases,
    updateExams,
    updateHospitalizations,
    updateInjuries,
    updateInternments,
    updateMedicines,
    updateNutritions,
    updatePhysicalActivities,
    updateSurgeries,
    updateVaccines,
    type TYPE_USER,
} from '~/services/helpers/medical-records'
import { MEDICAL_RECORDS } from '~/types/medical-records'

export type FAxiosUpdate<G = unknown> = (
    data: G,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) => Promise<AxiosResponse<G>>

export type FAxiosInsert<G = unknown> = (
    data: G,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) => Promise<AxiosResponse<G>>

export type FAxiosDelete = (
    id_object: string,
    cpf_cnpj: string,
    id_pet: string,
    user: TYPE_USER,
) => Promise<AxiosResponse<unknown>>

export type StrategiesMedicalRecordsType = Map<
    MEDICAL_RECORDS,
    [FAxiosUpdate, FAxiosInsert, FAxiosDelete]
>

export const StrategiesMedicalRecords = new Map([
    [
        MEDICAL_RECORDS.ALLERGIES,
        [updateAllergies, insertAllergies, deleteAllergies],
    ],
    [
        MEDICAL_RECORDS.BODY_EVOLUTION,
        [updateBodyEvolution, insertBodyEvolution, deleteBodyEvolution],
    ],
    [
        MEDICAL_RECORDS.DENTAL_PROCEDURES,
        [updateDentalProcedures, insertDentalProcedures, deleteDentalProcedures],
    ],
    [MEDICAL_RECORDS.DISEASES, [updateDiseases, insertDiseases, deleteDiseases]],
    [MEDICAL_RECORDS.EXAMS, [updateExams, insertExams, deleteExams]],
    [MEDICAL_RECORDS.INJURIES, [updateInjuries, insertInjuries, deleteInjuries]],
    [
        MEDICAL_RECORDS.INTERNMENTS,
        [updateInternments, insertInternments, deleteInternments],
    ],
    [
        MEDICAL_RECORDS.HOSPITALIZATIONS,
        [updateHospitalizations, insertHospitalizations, deleteHospitalizations],
    ],
    [
        MEDICAL_RECORDS.NUTRITIONS,
        [updateNutritions, insertNutritions, deleteNutritions],
    ],
    [
        MEDICAL_RECORDS.MEDICINES,
        [updateMedicines, insertMedicines, deleteMedicines],
    ],
    [
        MEDICAL_RECORDS.SURGERIES,
        [updateSurgeries, insertSurgeries, deleteSurgeries],
    ],
    [MEDICAL_RECORDS.VACCINES, [updateVaccines, insertVaccines, deleteVaccines]],
    [
        MEDICAL_RECORDS.PHYSICAL_ACTIVITIES,
        [
            updatePhysicalActivities,
            insertPhysicalActivities,
            deletePhysicalActivities,
        ],
    ],
]) as StrategiesMedicalRecordsType
