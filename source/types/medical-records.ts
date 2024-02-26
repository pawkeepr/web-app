export const MEDICAL_RECORDS = {
    BODY_EVOLUTION: 'body-evolution',
    VACCINES: 'vaccines',
    DISEASES: 'diseases',
    ALLERGIES: 'allergies',
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

type MedicalRecordOption = {
    value: (typeof MEDICAL_RECORDS)[keyof typeof MEDICAL_RECORDS]
    label: string
}

export const MedicalRecordOptions: MedicalRecordOption[] = [
    { value: MEDICAL_RECORDS.BODY_EVOLUTION, label: 'Evolução Corporal' },
    { value: MEDICAL_RECORDS.VACCINES, label: 'Vacinas' },
    { value: MEDICAL_RECORDS.DISEASES, label: 'Doenças' },
    { value: MEDICAL_RECORDS.ALLERGIES, label: 'Alergias' },
    { value: MEDICAL_RECORDS.HOSPITALIZATIONS, label: 'Hospitalizações' },
    { value: MEDICAL_RECORDS.INTERNMENTS, label: 'Internações' },
    { value: MEDICAL_RECORDS.INJURIES, label: 'Lesões' },
    { value: MEDICAL_RECORDS.SURGERIES, label: 'Cirurgias' },
    { value: MEDICAL_RECORDS.TREATMENTS, label: 'Tratamentos' },
    { value: MEDICAL_RECORDS.DENTAL_PROCEDURES, label: 'Procedimentos Dentários' },
    { value: MEDICAL_RECORDS.NUTRITIONS, label: 'Alimentação' },
    { value: MEDICAL_RECORDS.PHYSICAL_ACTIVITIES, label: 'Atividades Físicas' },
    { value: MEDICAL_RECORDS.MEDICINES, label: 'Medicamentos' },
    { value: MEDICAL_RECORDS.EXAMS, label: 'Exames' },
]

// Interface base com elementos comuns a todas as entradas do prontuário médico
export interface MedicalRecordEntry {
    type: MEDICAL_RECORDS
    name: string
    cpf_cnpj_who_applied: string
    who_applied: string
    type_profile: number
    notes: string
    date_application: string
    value: string
    coin: string
}

// Evolução Corporal
export interface BodyEvolution extends MedicalRecordEntry {
    type: 'body-evolution'
    age: string
    height: string
    length: string
    weight: string
    type_weight: string
    imc: string
    notes_consults: string
}

// Hospitalizações, Internações e Cirurgias
export interface Hospitalization extends MedicalRecordEntry {
    type: 'hospitalizations' | 'internments' | 'surgeries'
    local: string
    date: string
    appointment_date: string
    time_date: string
    health_insurance: string
    type_object: string
}

// Doenças, Alergias e Lesões
export interface Disease extends MedicalRecordEntry {
    type: 'diseases' | 'allergies' | 'injuries'
    when_agreements_date: string
    appointment_date: string
    type_object: string
}

// Procedimentos Dentários
export interface DentalProcedure extends MedicalRecordEntry {
    type: 'dental-procedures'
    status_dental: string
    need_dental_cleaning: string
    recommended_treatment: string
    anesthesia_required: boolean
    follow_up_required: boolean
    url_document: string
}

// Alimentação
export interface Nutrition extends MedicalRecordEntry {
    type: 'nutritions'
    start_time: string
    amount: string
    measure: string
    interval: string
    period: string
    starting_date: string
    type_object: string
}

// Atividades Físicas
export interface PhysicalActivity extends MedicalRecordEntry {
    type: 'physical-activities'
    continuously: boolean
    date_init: string
    date_end: string
}

// Medicamentos
export interface Medicine extends MedicalRecordEntry {
    type: 'medicines'
    brand: string
    continuous_use: string
    amount: string
    type_object: string
    interval: string
    period: string
    date_init: string
    date_end: string
    url_document: string
}

// Exames e Testes Rápidos
export interface ExamTest extends MedicalRecordEntry {
    type: 'exams'
    local: string
    date_exam: string
    time_date: string
    health_insurance: string
    type_object: string
    url_document: string
    status_exam: string
}

// Vacina
export interface Vaccine extends MedicalRecordEntry {
    type: 'vaccines'
    brand: string
    batch: string
    local: string
    dose: string
    date_next_application: string
    health_insurance: string
    url_document: string
}
