import * as yup from 'yup'
import type { VeterinaryConsultation } from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'

export type CtxVeterinaryAppointmentSchedule = RecordsShapeYup<
    Pick<VeterinaryConsultation, 'dates_consults' | 'tutor_pet_vet'>
>

export const schemaTutorPetVetValidation = yup
    .object()
    .shape<RecordsShapeYup<VeterinaryConsultation['tutor_pet_vet']>>({
        tutor: yup.object().required(),
        pet: yup
            .object()
            .shape({
                id_pet: yup.string().required(),
            })
            .required(),
        veterinary: yup.object().required(),
    })

export const schemaStepAppointmentSchedule = yup
    .object()
    .shape<CtxVeterinaryAppointmentSchedule>({
        tutor_pet_vet: schemaTutorPetVetValidation,
        dates_consults: yup.object().shape({
            date_consultation: yup.string().required('Campo obrigatório'),
            time_consultation: yup.string().required('Campo obrigatório'),
            type_consultation: yup.string().required('Campo obrigatório'),
            reason_consultation: yup.string().required('Campo obrigatório'),
        }),
    })

export type SchemaYupAppointmentSchedule = yup.InferType<
    typeof schemaStepAppointmentSchedule
>
