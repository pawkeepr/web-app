import { BsThreeDotsVertical } from 'react-icons/bs'
import {
    FaAllergies,
    FaBandAid,
    FaBed,
    FaBriefcaseMedical,
    FaCapsules,
    FaFileMedical,
    FaHeart,
    FaHospital,
    FaRunning,
    FaSyringe,
    FaTooth,
    FaUserMd,
    FaUtensils,
} from 'react-icons/fa'

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
    OTHERS: 'others',
} as const
export type MEDICAL_RECORDS = (typeof MEDICAL_RECORDS)[keyof typeof MEDICAL_RECORDS]

type MedicalRecordOption = {
    value: (typeof MEDICAL_RECORDS)[keyof typeof MEDICAL_RECORDS]
    label: string
    icon: React.FC
}

export const MedicalRecordOptions: MedicalRecordOption[] = [
    {
        value: MEDICAL_RECORDS.BODY_EVOLUTION,
        label: 'Evolução Corporal',
        icon: FaHeart,
    },
    {
        value: MEDICAL_RECORDS.VACCINES,
        label: 'Vacinas',
        icon: FaSyringe,
    },
    {
        value: MEDICAL_RECORDS.DISEASES,
        label: 'Doenças',
        icon: FaBriefcaseMedical,
    },
    {
        value: MEDICAL_RECORDS.ALLERGIES,
        label: 'Alergias',
        icon: FaAllergies,
    },
    {
        value: MEDICAL_RECORDS.HOSPITALIZATIONS,
        label: 'Hospitalizações',
        icon: FaHospital,
    },
    {
        value: MEDICAL_RECORDS.INTERNMENTS,
        label: 'Internações',
        icon: FaBed,
    },
    {
        value: MEDICAL_RECORDS.INJURIES,
        label: 'Lesões',
        icon: FaBandAid,
    },
    {
        value: MEDICAL_RECORDS.SURGERIES,
        label: 'Cirurgias',
        icon: FaUserMd,
    },
    {
        value: MEDICAL_RECORDS.DENTAL_PROCEDURES,
        label: 'Procedimentos Dentários',
        icon: FaTooth,
    },
    {
        value: MEDICAL_RECORDS.NUTRITIONS,
        label: 'Alimentação',
        icon: FaUtensils,
    },
    {
        value: MEDICAL_RECORDS.PHYSICAL_ACTIVITIES,
        label: 'Atividades Físicas',
        icon: FaRunning,
    },
    {
        value: MEDICAL_RECORDS.MEDICINES,
        label: 'Medicamentos',
        icon: FaCapsules,
    },
    {
        value: MEDICAL_RECORDS.EXAMS,
        label: 'Exames',
        icon: FaFileMedical,
    },
    {
        value: MEDICAL_RECORDS.OTHERS,
        label: 'Outros',
        icon: BsThreeDotsVertical,
    },
].sort((a, b) => a.label.localeCompare(b.label))

export interface PetMedicalRecords {
    id: string
    date_pet: {
        id_pet: string
        cpf_cnpj: string
    }
    list_well_being: {
        body_evolution: BodyEvolution[] // ✅
        physical_activities: PhysicalActivity[] // ✅
    }
    list_dental_procedures: DentalProcedure[] // ✅
    list_exams_tests: ExamTest[] // ✅
    list_nutritions: Nutrition[]
    list_vaccines: Vaccine[]
    list_medicines: Medicine[]
    list_hospital_information: {
        surgeries: Hospitalization[]
        allergies: Disease[]
        diseases: Disease[]
        injuries: Disease[]
        internment: Hospitalization[]
        hospitalizations: Hospitalization[]
    }
    list_anamnesis: {
        digestive_sys: unknown[] // Pode ser especificado se houver um formato padrão para informações do sistema digestivo
        respiratory_sys: unknown[] // Pode ser especificado se houver um formato padrão para informações do sistema respiratório
        locomotor_sys: unknown[] // Pode ser especificado se houver um formato padrão para informações do sistema locomotor
        urinary_system: unknown[] // Pode ser especificado se houver um formato padrão para informações do sistema urinário
        nervous_sys: unknown[] // Pode ser especificado se houver um formato padrão para informações do sistema nervoso
    }
    list_others: unknown[] // Pode ser especificado se houver um formato padrão para outras informações
    date_register: string
    owner: string
}

// Interface base com elementos comuns a todas as entradas do prontuário médico
export interface MedicalRecordEntry {
    id?: string
    type: MEDICAL_RECORDS
    name: string
    cpf_cnpj_who_applied: string
    id_appointment: string | null
    who_applied: string
    type_profile: number
    notes: string
    date_register_log: string
    info_register_log: string
    value: string
    coin: string
}

// Evolução Corporal
export interface BodyEvolution
    extends Omit<MedicalRecordEntry, 'date_application'> {
    id?: string
    type: 'body-evolution'
    age: string
    date_register_log: string
    notes_consults: string
    type_weight: 'kg' | 'g'
    weight: string
}

// Hospitalizações, Internações e Cirurgias
export interface Hospitalization extends MedicalRecordEntry {
    type: 'hospitalizations' | 'internments' | 'surgeries'
    local: string
    appointment_date: string
    date_start: string
    time_start: string
    date_end: string
    time_end: string
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
    status_dental: 'good' | 'regular' | 'bad'
    recommended_treatment: string
    anesthesia_required: boolean
    follow_up_required: boolean
    url_document: string
}

// Alimentação
export interface Nutrition extends MedicalRecordEntry {
    type: 'nutritions'
    frequency: string
    interval: string
    measure: string
    amount: string
    start_time: string
    starting_date: string
    type_nutrition: string | null
    type_object: string
}

// Atividades Físicas
export interface PhysicalActivity extends MedicalRecordEntry {
    id?: string
    type: 'physical-activities'
    continuously: boolean
    date_init: string
    date_end: string
}

// Medicamentos
export interface Medicine extends MedicalRecordEntry {
    type: 'medicines'
    brand: string
    continuous_use: 'yes' | 'no'
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
