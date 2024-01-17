import * as yup from 'yup'
import { schemaTutorPetVetValidation } from '~/pages/AppointmentsPage/components/validations.yup'
import type { VeterinaryConsultation } from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'

export type CtxVeterinaryAppointmentSchedule = RecordsShapeYup<
    Pick<VeterinaryConsultation, 'dates_consults' | 'tutor_pet_vet'>
>

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
