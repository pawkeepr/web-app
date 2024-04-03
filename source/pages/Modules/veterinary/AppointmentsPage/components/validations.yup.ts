import * as yup from 'yup'
import { schemaTutorPetVetValidation } from '~/Components/modals/scheduled-v2-modal/components/steps/validation.yup'
import type { CtxStepAnamnese } from '~/Components/organism/card-input-anamnese/card-input-anamnese'
import type {
    AppointmentDetails,
    VeterinaryConsultation,
} from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'

export type CtxStepTreatment = Pick<VeterinaryConsultation, 'treatments'>
export type { CtxStepAnamnese }
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
        dates_consults: yup.object().optional(),
    })

export type ShapeTreatments = RecordsShapeYup<CtxStepTreatment['treatments']>

export const schemaStepTreatmentValidation = yup.object().shape<ShapeTreatments>({
    questions_treatment: yup.array().min(1).required(),
    note: yup.string().optional(),
})

export type ShapeAppointmentDetails = RecordsShapeYup<AppointmentDetails>
export type ShapeAppointmentDetailsPayment = RecordsShapeYup<
    AppointmentDetails['payment']
>

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

export const schemaStepAppointment = yup
    .object()
    .shape<RecordsShapeYup<VeterinaryConsultation>>({
        id: yup.string().optional(),
        dates_consults: yup.object().optional(),
        tutor_pet_vet: schemaTutorPetVetValidation,
        details_pet_consultation: schemaValidationDetailsPetConsultation,
        anamnesis: yup.object().optional(),
        treatments: schemaStepTreatmentValidation,
        appointment_details: schemaStepAppointmentDetails,
        appointment_status: yup.string().optional(),
    })

export type SchemaYupAppointment = yup.InferType<typeof schemaStepAppointment>
