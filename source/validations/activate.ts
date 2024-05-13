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
    ...specialty_validation,
})

export type ActivateAccount = Yup.InferType<typeof validate>

export default validate
