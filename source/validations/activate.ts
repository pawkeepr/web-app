import * as Yup from 'yup';

import { Contact } from '~/types/profile';
import Address from './address';

const transformTrim = (value: any, originalValue: string) => {
    // Remover espaços em branco extras da string
    return typeof originalValue === 'string'
        ? originalValue.trim()
        : originalValue;
};

export type IMainTutor = {
    first_name: string;
    last_name: string;
    name: string;
    url_img: string;
};

export type UserInformation = {
    contact: Contact;
};

const validate = Yup.object().shape({
    email: Yup.string()
        .email('O email deve ser válido')
        .required('O campo de email é obrigatório'),
    firstName: Yup.string()
        .transform(transformTrim)
        .min(2, 'O nome deve ter pelo menos 2 caracteres')
        .max(50, 'O nome deve ter no máximo 50 caracteres')
        .required('O campo de nome é obrigatório'),
    lastName: Yup.string()
        .transform(transformTrim)
        .min(2, 'O sobrenome deve ter pelo menos 2 caracteres')
        .max(155, 'O sobrenome deve ter no máximo 50 caracteres')
        .required('O campo de sobrenome é obrigatório'),
    crmv: Yup.string()
        .matches(/^[A-Za-z]{2}\d{4,6}$/, 'CRMV inválido. Exemplo: SP12345')
        .min(6, 'O CRMV deve ter pelo menos 6 caracteres')
        .transform((value) => value.toUpperCase())
        .required('O Campo CRMV é obrigatório'),
    specialty: Yup.object({
        value: Yup.string().required('O campo especialidade é obrigatório'),
        label: Yup.string().required('O campo especialidade é obrigatório'),
    }).required('O campo especialidade é obrigatório'),
    list_service_type: Yup.array()
        .min(1, 'Selecione pelo menos um tipo de atendimento')
        .required(),
    list_specialty: Yup.array()
        .min(1, 'Selecione pelo menos uma especialidade')
        .of(
            Yup.object().shape({
                value: Yup.string().required(
                    'O campo especialidade é obrigatório',
                ),
                label: Yup.string().required(
                    'O campo especialidade é obrigatório',
                ),
            }),
        )
        .required(),
    contact: Yup.object().shape({
        email: Yup.string()
            .email('O email deve ser válido')
            .required('O campo de email é obrigatório'),
        phone: Yup.string()
            .matches(
                /^\+55 \(\d{2}\) \d \d{4}-\d{4}$/,
                'Número de telefone inválido',
            )
            .test('phone-validator', 'Número de telefone inválido', (value) => {
                if (!value) return false;
                return value.length >= 10;
            })
            .required('O campo de telefone é obrigatório'),
        whatsapp: Yup.string()
            .matches(
                /^\+55 \(\d{2}\) \d \d{4}-\d{4}$/,
                'Número de telefone inválido',
            )
            .test('phone-validator', 'Número de telefone inválido', (value) => {
                if (!value) return false;
                return value.length >= 10;
            })
            .required('O campo de whatsapp é obrigatório'),
    }),
    cpf_cnpj: Yup.string()
        .required('Este campo é obrigatório')
        .transform((value) => value.replace(/[^\d]/g, '')),
    // .test("cpf-cnpj-validator", "CPF/CNPJ inválido", (value) => {
    //     if (!value) return false;
    //     return cpf.isValid(value) || cnpj.isValid(value);
    // }),
    location: Address,
});

export type ActivateAccount = Yup.InferType<typeof validate>;

export default validate;
