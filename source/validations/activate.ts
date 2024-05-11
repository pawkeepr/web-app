import * as Yup from 'yup'

import type { Contact } from '~/types/profile'
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
    types_animals: Yup.array().of(Yup.string()),
    specialty: Yup.string().required('O campo especialidade é obrigatório'),
    list_service_type: Yup.array()
        .of(Yup.string())
        .min(1, 'Selecione pelo menos um tipo de atendimento')
        .required(),
    types_service: Yup.array()
        .min(1, 'Selecione pelo menos um tipo de serviço de atendimento')
        .required(),
    list_specialty: Yup.array()
        .min(1, 'Selecione pelo menos uma especialidade')
        .of(Yup.string())
        .required(),
}

const validate = Yup.object().shape({
    email: Yup.string()
        .email('O email deve ser válido')
        .required('O campo de email é obrigatório'),
    firstName: Yup.string()
        .trim()
        .min(2, 'O nome deve ter pelo menos 2 caracteres')
        .max(50, 'O nome deve ter no máximo 50 caracteres')
        .required('O campo de nome é obrigatório'),
    lastName: Yup.string()
        .trim()
        .min(2, 'O sobrenome deve ter pelo menos 2 caracteres')
        .max(155, 'O sobrenome deve ter no máximo 50 caracteres')
        .required('O campo de sobrenome é obrigatório'),
    crmv: Yup.string()
        .matches(/^[A-Za-z]{2}\d{4,6}$/, 'CRMV inválido. Exemplo: SP12345')
        .min(6, 'O CRMV deve ter pelo menos 6 caracteres')
        .transform((value) => value.toUpperCase())
        .required('O Campo CRMV é obrigatório'),
    contact: contactValidationSchema,
    cpf_cnpj: Yup.string()
        .required('Este campo é obrigatório')
        .transform((value) => value.replace(/[^\d]/g, '')),
    // .test("cpf-cnpj-validator", "CPF/CNPJ inválido", (value) => {
    //     if (!value) return false;
    //     return cpf.isValid(value) || cnpj.isValid(value);
    // }),
    location: Address,
    ...specialty_validation,
})

export type ActivateAccount = Yup.InferType<typeof validate>

export default validate
