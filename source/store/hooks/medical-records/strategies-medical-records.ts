import type { AxiosResponse } from 'axios'
import {
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
} from '~/services/helpers/medical-records'
import { MEDICAL_RECORDS } from '~/types/medical-records'

export type FAxiosUpdate<G = unknown> = (
    data: unknown,
    cpf_cnpj: string,
    id_pet: string,
) => Promise<AxiosResponse<G>>

export const StrategiesMedicalRecords = new Map<MEDICAL_RECORDS, FAxiosUpdate>([
    [MEDICAL_RECORDS.ALLERGIES, updateAllergies],
    [MEDICAL_RECORDS.BODY_EVOLUTION, updateBodyEvolution],
    [MEDICAL_RECORDS.DENTAL_PROCEDURES, updateDentalProcedures],
    [MEDICAL_RECORDS.DISEASES, updateDiseases],
    [MEDICAL_RECORDS.EXAMS, updateExams],
    [MEDICAL_RECORDS.INJURIES, updateInjuries],
    [MEDICAL_RECORDS.INTERNMENTS, updateInternments],
    [MEDICAL_RECORDS.HOSPITALIZATIONS, updateHospitalizations],
    [MEDICAL_RECORDS.NUTRITIONS, updateNutritions],
    [MEDICAL_RECORDS.MEDICINES, updateMedicines],
    [MEDICAL_RECORDS.SURGERIES, updateSurgeries],
    [MEDICAL_RECORDS.VACCINES, updateVaccines],
    [MEDICAL_RECORDS.PHYSICAL_ACTIVITIES, updatePhysicalActivities],
])
