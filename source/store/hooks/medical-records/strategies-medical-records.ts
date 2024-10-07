import type { AxiosResponse } from 'axios'
import {
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

export type StrategiesMedicalRecordsType = Map<
    MEDICAL_RECORDS,
    [FAxiosUpdate, FAxiosInsert]
>

export const StrategiesMedicalRecords = new Map([
    [MEDICAL_RECORDS.ALLERGIES, [updateAllergies, insertAllergies]],
    [MEDICAL_RECORDS.BODY_EVOLUTION, [updateBodyEvolution, insertBodyEvolution]],
    [
        MEDICAL_RECORDS.DENTAL_PROCEDURES,
        [updateDentalProcedures, insertDentalProcedures],
    ],
    [MEDICAL_RECORDS.DISEASES, [updateDiseases, insertDiseases]],
    [MEDICAL_RECORDS.EXAMS, [updateExams, insertExams]],
    [MEDICAL_RECORDS.INJURIES, [updateInjuries, insertInjuries]],
    [MEDICAL_RECORDS.INTERNMENTS, [updateInternments, insertInternments]],
    [
        MEDICAL_RECORDS.HOSPITALIZATIONS,
        [updateHospitalizations, insertHospitalizations],
    ],
    [MEDICAL_RECORDS.NUTRITIONS, [updateNutritions, insertNutritions]],
    [MEDICAL_RECORDS.MEDICINES, [updateMedicines, insertMedicines]],
    [MEDICAL_RECORDS.SURGERIES, [updateSurgeries, insertSurgeries]],
    [MEDICAL_RECORDS.VACCINES, [updateVaccines, insertVaccines]],
    [
        MEDICAL_RECORDS.PHYSICAL_ACTIVITIES,
        [updatePhysicalActivities, insertPhysicalActivities],
    ],
]) as StrategiesMedicalRecordsType
