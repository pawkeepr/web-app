export const MEDICAL_RECORDS = {
    body_evolution: 'body-evolution',
    vaccines: 'vaccines',
    diseases: 'diseases',
    allergies: 'allergies',
    medications: 'medications',
    hospitalizations: 'hospitalizations',
    internment: 'internment',
    injuries: 'injuries',
    surgeries: 'surgeries',
    treatments: 'treatments',
    dental_treatments: 'dental-treatments',
    nutritions: 'nutritions',
    physical_activities: 'physical-activities',
    medicines: 'medicines',
    exams: 'exams',
} as const
export type MEDICAL_RECORDS = (typeof MEDICAL_RECORDS)[keyof typeof MEDICAL_RECORDS]
