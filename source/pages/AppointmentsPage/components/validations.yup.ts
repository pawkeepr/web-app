import * as yup from 'yup';
import {
    AppointmentDetails,
    VeterinaryConsultation,
} from '~/types/appointment';
import { RecordsShapeYup } from '~/types/helpers';

export type CtxStepAnamnese = Pick<
    VeterinaryConsultation,
    'anamnesis' | 'details_pet_consultation'
>;

export type CtxStepTreatment = Pick<VeterinaryConsultation, 'treatments'>;

const schemaValidationDetailsPetConsultation = yup
    .object()
    .shape<RecordsShapeYup<VeterinaryConsultation['details_pet_consultation']>>(
        {
            age: yup.string().optional().nullable(),
            height: yup.string().optional().nullable(),
            imc: yup.string().optional().nullable(),
            length: yup.string().optional().nullable(),
            type_weight: yup.string().optional().nullable(),
            weight: yup
                .number() // Define o campo como numérico
                .transform((value) =>
                    Number.isNaN(value) ? undefined : Number(value),
                ) // Converte de string para número
                .required('O peso é obrigatório') // Verifica se o campo foi preenchido
                .positive('O peso deve ser um número positivo') // Verifica se o número é positivo
                .integer('O peso deve ser um número inteiro') // Verifica se o número é inteiro (se necessário)
                .min(1, 'O peso deve ser pelo menos 1') // Define um valor mínimo (ajuste conforme necessário)
                .max(1000, 'O peso deve ser no máximo 1000') // Define um valor máximo (ajuste conforme necessário)
                .typeError('O peso deve ser um número'), // Mensagem de erro caso o valor não seja um número
        },
    );

export const schemaStepAnamneseValidation = yup
    .object()
    .shape<RecordsShapeYup<CtxStepAnamnese>>({
        details_pet_consultation: schemaValidationDetailsPetConsultation,
        anamnesis: yup.object().optional(),
    });

export type ShapeTreatments = RecordsShapeYup<CtxStepTreatment['treatments']>;

export const schemaStepTreatmentValidation = yup
    .object()
    .shape<ShapeTreatments>({
        questions_treatment: yup.array().min(1).required(),
        note: yup.string().optional(),
    });

export const schemaTutorPetVetValidation = yup
    .object()
    .shape<RecordsShapeYup<VeterinaryConsultation['tutor_pet_vet']>>({
        tutor: yup.object().required(),
        pet: yup.object().required(),
        veterinary: yup.object().required(),
    });

export type ShapeAppointmentDetails = RecordsShapeYup<AppointmentDetails>;
export type ShapeAppointmentDetailsPayment = RecordsShapeYup<
    AppointmentDetails['payment']
>;

export const schemaStepAppointmentDetails = yup
    .object()
    .shape<ShapeAppointmentDetails>({
        appointment_geolocation: yup.object().optional(),
        appointment_signature: yup.object().optional(),
        payment: yup
            .object()
            .shape<ShapeAppointmentDetailsPayment>({
                coin: yup.string().optional(),
                date_payment: yup.string().optional(),
                form_payment: yup.string().required(),
                number_installments: yup.number().optional(),
                status_payment: yup.string().optional(),
                value_payment: yup.number().required(),
            })
            .required(),
    });

export const schemaStepAppointment = yup
    .object()
    .shape<RecordsShapeYup<VeterinaryConsultation>>({
        id: yup.string().optional(),
        id_pet: yup.string().optional(),
        cpf_tutor: yup.string().required(),
        crmv_vet: yup.string().required(),
        cpf_cnpj_vet: yup.string().required(),
        dates_consults: yup.object().optional(),
        tutor_pet_vet: schemaTutorPetVetValidation,
        details_pet_consultation: schemaValidationDetailsPetConsultation,
        anamnesis: yup.object().optional(),
        treatments: schemaStepTreatmentValidation,
        appointment_details: yup.object().optional(),
    });

export type SchemaYupAppointment = yup.InferType<typeof schemaStepAppointment>;
