import * as yup from 'yup'
import { schemaTutorPetVetValidation } from '~/Components/modals/scheduled-v2-modal/components/steps/validation.yup'
import type {
    AppointmentDetails,
    ExamsAnamnesis,
    VeterinaryConsultation,
} from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'

export type CtxStepAnamnese = Pick<
    VeterinaryConsultation,
    'anamnesis' | 'details_pet_consultation' | 'dates_consults' | 'exams_anamnesis'
>

export type CtxStepDiagnostic = Pick<VeterinaryConsultation, 'diagnosis'>

export type CtxStepTreatment = Pick<
    VeterinaryConsultation,
    'treatments' | 'tutor_pet_vet'
>
export const schemaValidationDetailsPetConsultation = yup
    .object()
    .shape<RecordsShapeYup<VeterinaryConsultation['details_pet_consultation']>>({
        age: yup.string().optional().nullable(),
        height: yup.string().optional().nullable(),
        imc: yup.string().optional().nullable(),
        length: yup.string().optional().nullable(),
        type_weight: yup.string().optional().nullable(),
        weight: yup
            .number() // Define o campo como numérico
            .transform((value) => (Number.isNaN(value) ? undefined : Number(value))) // Converte de string para número
            .required('O peso é obrigatório') // Verifica se o campo foi preenchido
            .positive('O peso deve ser um número positivo') // Verifica se o número é positivo
            .integer('O peso deve ser um número inteiro') // Verifica se o número é inteiro (se necessário)
            .min(1, 'O peso deve ser pelo menos 1') // Define um valor mínimo (ajuste conforme necessário)
            .max(1000, 'O peso deve ser no máximo 1000') // Define um valor máximo (ajuste conforme necessário)
            .typeError('O peso deve ser um número'), // Mensagem de erro caso o valor não seja um número
    })

export const schemaStepAnamneseValidation = yup
    .object()
    .shape<RecordsShapeYup<CtxStepAnamnese>>({
        details_pet_consultation: schemaValidationDetailsPetConsultation,
        anamnesis: yup.object().optional(),
        exams_anamnesis: yup.array().optional(),
        dates_consults: yup.object().optional(),
    })

export type ShapeTreatments = RecordsShapeYup<CtxStepTreatment['treatments']>

export const schemaStepTreatmentValidation = yup.object().shape<ShapeTreatments>({
    questions_treatment: yup.array().optional().nullable(),
    note: yup.string().optional(),
})

export type ShapeAppointmentDetails = RecordsShapeYup<AppointmentDetails>
export type ShapeAppointmentDetailsPayment = RecordsShapeYup<
    AppointmentDetails['payment']
>

export type ShapeAppointmentExams = RecordsShapeYup<
    CtxStepAnamnese['exams_anamnesis']
>

export type ShapeAppointmentsPhysicalExam = RecordsShapeYup<
    ExamsAnamnesis['physical_exam']
>

export const schemaExamsAnamnesis = yup.object().shape<ShapeAppointmentExams>({
    complementary_exams: yup.array().optional(),
    physical_exam: yup.object().shape<ShapeAppointmentsPhysicalExam>({
        behavior: yup.string().optional(),
        body_state: yup.string().optional(),
        diet: yup.string().optional(),
        fc: yup.string().optional(),
        fr: yup.string().optional(),
        hydration: yup.string().optional(),
        mucous_membranes: yup.string().optional(),
        other_finds: yup.array().optional(),
        pa: yup.string().optional(),
        tpc: yup.string().optional(),
    }),
})

export const schemaPayment = yup
    .object()
    .shape<ShapeAppointmentDetailsPayment>({
        coin: yup.string().optional(),
        date_payment: yup.string().optional(),
        form_payment: yup.object().required(),
        number_installments: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? undefined : Number(value)))
            .optional(),
        status_payment: yup.string().optional(),
        value_payment: yup
            .string()
            .transform((value: string) => {
                const valueFormatted = value.replace('R$ ', '').replace(',', '.')
                return Number.isNaN(valueFormatted) ? undefined : valueFormatted
            })
            .required('O valor do pagamento é obrigatório'),
    })
    .required()

export const schemaStepAppointmentDetails = yup
    .object()
    .shape<ShapeAppointmentDetails>({
        appointment_geolocation: yup.object().optional(),
        appointment_signature: yup.object().optional(),
        payment: schemaPayment,
    })

export const schemaStepDiagnostic = {
    prescription: yup.string().required('A prescrição é obrigatória'),
    prognosis: yup.string().optional(),
    note: yup.string().optional(),
}

export const partialOneValidation = {
    id: yup.string().optional(),
    dates_consults: yup.object().optional(),
    tutor_pet_vet: schemaTutorPetVetValidation,
    details_pet_consultation: schemaValidationDetailsPetConsultation,
    anamnesis: yup.object().optional(),
    treatments: schemaStepTreatmentValidation.optional().nullable(),
    exams_anamnesis: schemaExamsAnamnesis.optional().nullable(),
    appointment_status: yup.string().optional(),
    diagnosis: yup.object().shape(schemaStepDiagnostic),
}

export const schemaStepAppointment = yup
    .object()
    .shape<RecordsShapeYup<VeterinaryConsultation>>({
        ...partialOneValidation,
        appointment_details: schemaStepAppointmentDetails,
    })

export type SchemaYupAppointment = yup.InferType<typeof schemaStepAppointment>
