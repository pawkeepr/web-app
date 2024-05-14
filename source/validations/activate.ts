import * as Yup from 'yup'

import type { Contact } from '~/types/profile'
import { validatePerson } from '~/validations/person'
import Address from './address'
import contactValidationSchema from './contact'

export type IMainTutor = {
    first_name: string
    last_name: string
    name: string
    url_img: string
}

export type UserInformation = {
    contact: Contact
}

export const specialty_validation = {
    types_animals: Yup.array().of(Yup.string()).optional(),
    specialty: Yup.string().required('O campo especialidade é obrigatório'),
    list_service_type: Yup.array()
        .of(Yup.string())
        .min(1, 'Selecione pelo menos um tipo de atendimento')
        .required(),
    types_service: Yup.array()
        .min(1, 'Selecione pelo menos um tipo de serviço de atendimento')
        .required(),
    list_specialty: Yup.array().of(Yup.string()).optional(),
}

const validate = Yup.object().shape({
    ...validatePerson,
    contact: contactValidationSchema,
    location: Address,
    opening_days_times: Yup.array()
        .of(
            Yup.object().shape({
                type_schedule: Yup.string().required(
                    'O campo tipo de atendimento é obrigatório',
                ),
                day: Yup.string().required('O campo dia é obrigatório'),
                hour_start: Yup.string().required(
                    'O campo hora de início é obrigatório',
                ),
                hour_end: Yup.string().required(
                    'O campo hora de término é obrigatório',
                ),
                out_of_hours_service: Yup.string().required(
                    'O campo atendimento fora do horário é obrigatório',
                ),
            }),
        )
        .optional(),
    ...specialty_validation,
})

export type ActivateAccount = Yup.InferType<typeof validate>

export default validate
