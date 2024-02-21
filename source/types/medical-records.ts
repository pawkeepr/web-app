export const MEDICAL_RECORDS = {
    BODY_EVOLUTION: 'body-evolution',
    VACCINES: 'vaccines',
    DISEASES: 'diseases',
    ALLERGIES: 'allergies',
    MEDICATIONS: 'medications',
    HOSPITALIZATIONS: 'hospitalizations',
    INTERNMENTS: 'internments',
    INJURIES: 'injuries',
    SURGERIES: 'surgeries',
    TREATMENTS: 'treatments',
    DENTAL_PROCEDURES: 'dental-procedures',
    NUTRITIONS: 'nutritions',
    PHYSICAL_ACTIVITIES: 'physical-activities',
    MEDICINES: 'medicines',
    EXAMS: 'exams',
} as const
export type MEDICAL_RECORDS = (typeof MEDICAL_RECORDS)[keyof typeof MEDICAL_RECORDS]
