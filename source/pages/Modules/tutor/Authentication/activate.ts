import { cnpj, cpf } from 'cpf-cnpj-validator'
import * as Yup from 'yup'

import type { Contact } from '~/types/profile'
import locationValidationSchema from '~/validations/address'

export type IMainTutor = {
    first_name: string
    last_name: string
    name: string
    url_img: string
}

export type UserInformation = {
    contact: Contact
}

const validate = Yup.object().shape({
    id: Yup.string().nullable().optional(),
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
    contact: Yup.object().shape({
        email: Yup.string()
            .email('O email deve ser válido')
            .required('O campo de email é obrigatório'),
        whatsapp: Yup.string()
            .matches(
                /^\+55 \(\d{2}\) \d \d{4}-\d{4}$/,
                'Número de telefone inválido',
            )
            .test('phone-validator', 'Número de telefone inválido', (value) => {
                if (!value) return false
                return value.length >= 10
            })
            .required('O campo de whatsapp é obrigatório'),
    }),
    cpf_cnpj: Yup.string()
        .required('Este campo é obrigatório')
        .transform((value) => value.replace(/[^\d]/g, ''))
        .test('cpf-cnpj-validator', 'CPF/CNPJ inválido', (value) => {
            if (!value) return false
            return cpf.isValid(value) || cnpj.isValid(value)
        }),
    location: locationValidationSchema,
})

export type ActivateAccount = Yup.InferType<typeof validate>

export default validate
