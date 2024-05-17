import type { OptionSelect } from '~/Components/molecules/field-control'
import type { MEDICAL_RECORDS } from './medical-records'
import type { IMainResponsibleGuardian, On_Off, PetData } from './pet-v2'
import type { DTOProfile } from './profile'

export interface VeterinaryConsultation {
    id?: string | null
    // id_pet: string
    // cpf_tutor: string
    // crmv_vet: string
    // cpf_cnpj_vet: string
    dates_consults: DateConsults
    tutor_pet_vet: TutorPetVet
    details_pet_consultation: DetailsPetConsultation
    anamnesis: Anamnesis
    exams_anamnesis: {
        physical_exam: PhysicalExam
        complementary_exams: ComplementaryExam[]
    }
    treatments: Treatments
    appointment_details: AppointmentDetails
    appointment_status?: AppointmentStatus
}

export type AppointmentStatus = {
    canceled: On_Off
    confirmed: On_Off
    done: On_Off
    reason_canceled: string
    rescheduled: On_Off
    scheduled: On_Off
    is_possible_action: On_Off
}

export type ComplementaryExam = {
    type_exam: string
    name_exam: string
    notes: string
}

export interface ISignatureAppointment {
    signature_data: string
    date_signature: string
    type_signature: string
    status_signature: string
    ip_address: string
    browser_device: string
    operational_system: string
}

export interface IGeolocationAppointment {
    latitude: string
    longitude: string
    precision: string
    altitude: string
    speed: string
    heading: string
    date_geolocation: string
}

export interface DateConsults {
    date_consultation: string
    time_consultation: string
    type_consultation: string
    reason_consultation: string
    additional_remarks: string
}

export interface TutorPetVet {
    tutor: IMainResponsibleGuardian
    pet: PetData
    veterinary: DTOProfile
}

export interface DetailsPetConsultation {
    age: string
    height: string
    length: string
    weight: string
    type_weight: string
    imc: number
}

interface PhysicalExam {
    diet: string
    fc: string // Frequência Cardíaca
    fr: string // Frequência Respiratória
    tpc: string // Tempo de Preenchimento Capilar
    hydration: string
    pa: string // Pressão Arterial
    behavior: string
    mucous_membranes: string // Mucosas
    body_state: string // Estado Corporal
    other_finds: string[] // Outros Achados
}

export interface Anamnesis {
    questions_anamnesis: QuestionAnamnesis[]
    note: string
}

export const OPTION_BOOLEAN = {
    yes: 'yes',
    true: 'yes',
    no: 'no',
    other: 'other',
    false: 'no',
} as const
export type OPTION_BOOLEAN = (typeof OPTION_BOOLEAN)[keyof typeof OPTION_BOOLEAN]

export type LogicalListDefaultAnamnesis = 'logical'

export interface QuestionAnamnesis {
    id?: string | number
    type_anamnesis: string | OptionSelect
    name_anamnesis: string // Pergunta "Ele nadou?"
    notes_anamnesis: string // Observação
    options_anamnesis: OPTION_BOOLEAN
    checked: boolean | null
}

export interface Treatments {
    questions_treatment: QuestionTreatment[]
    note: string
}

export interface QuestionTreatment {
    type_treatment: MEDICAL_RECORDS
    name_treatment: string
    notes_treatment: string
    value_coin_treatment: string
    coin_treatment: string
}

export interface AppointmentDetails {
    payment: IPayment
    appointment_signature: ISignatureAppointment
    appointment_geolocation: IGeolocationAppointment
}

export const PaymentForm = {
    credit_card: 'credit_card',
    debit_card: 'debit_card',
    cash: 'cash',
    pix: 'pix',
    transfer: 'transfer',
} as const
export type PaymentForm = (typeof PaymentForm)[keyof typeof PaymentForm]

export interface IPayment {
    form_payment: PaymentForm
    value_payment: string
    coin: string
    number_installments: string
    status_payment: string
    date_payment: string
}
