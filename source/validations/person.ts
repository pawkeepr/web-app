import * as Yup from 'yup'
import { validateEmail, validatePhone } from './contact'

export const validateFirstName = Yup.string()
    .trim()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres')

export const validateLastName = Yup.string()
    .trim()
    .min(2, 'O sobrenome deve ter pelo menos 2 caracteres')
    .max(155, 'O sobrenome deve ter no máximo 50 caracteres')

export const validateCRMV = Yup.string()
    .matches(/^[A-Za-z]{2}\d{4,6}$/, 'CRMV inválido. Exemplo: SP12345')
    .min(6, 'O CRMV deve ter pelo menos 6 caracteres')
    .transform((value) => value.toUpperCase())

export const validateCPF_CNPJ = Yup.string()
    .required('Este campo é obrigatório')
    .transform((value) => value.replace(/[^\d]/g, ''))

export const validatePerson = {
    firstName: validateFirstName.required('Este campo é obrigatório'),
    lastName: validateLastName.required('Este campo é obrigatório'),
    crmv: validateCRMV.required('Este campo é obrigatório'),
    contact: Yup.object()
        .shape({
            phone: validatePhone.required('Este campo é obrigatório'),
            email: validateEmail.required('Este campo é obrigatório'),
            whatsapp: validatePhone.required('Este campo é obrigatório'),
        })
        .required(),
    cpf_cnpj: validateCPF_CNPJ.required('Este campo é obrigatório'),
    // .test('cpf-cnpj-validator', 'CPF/CNPJ inválido', value => {
    //     if (!value) return false;
    //     return cpf.isValid(value) || cnpj.isValid(value);
    // })
}

const validate = Yup.object().shape(validatePerson)

export type Person = Yup.InferType<typeof validate>

export default validate
