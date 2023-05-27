import { cnpj, cpf } from 'cpf-cnpj-validator';
import * as Yup from 'yup';
import { RULES } from '~/store/auth/profile/types';

const transformTrim = (value: any, originalValue: string) => {
    // Remover espaços em branco extras da string
    return typeof originalValue === 'string' ? originalValue.trim() : originalValue;
}

const validate = Yup.object().shape({
    email: Yup.string().email('O email deve ser válido').required('O campo de email é obrigatório'),
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
    crmv: Yup.string().matches(/^[A-Z]{2}\d{4,6}$/,
        'CRMV inválido. Exemplo: SP12345'
    ).required('O Campo CRMV é obrigatório'),
    type: Yup.number().oneOf([RULES.ADMIN, RULES.VETERINARY, RULES.TUTOR]).required(),
    // company: Yup.string().when('cpf_cnpj', {
    //     is: (value: string) => cnpj.isValid(value),
    //     then: Yup.string().transform(transformTrim).required('Este campo é obrigatório'),
    //     otherwise: Yup.string().nullable(),
    // }),
    // age: Yup.number().positive().integer().required(),
    phone: Yup.string().matches(/^[\d()-\s]+$/)
        .test('valid-phone-number', 'Número de telefone inválido', (value) => {
            if (!value) {
                return false;
            }

            // Removendo caracteres não numéricos do número de telefone
            const numericValue = value.replace(/\D/g, '');

            // Verificando se o número de telefone tem pelo menos 10 dígitos
            return numericValue.length === 11;
        }).required(),
    cpf_cnpj: Yup.string()
        .required('Este campo é obrigatório')
        .transform(value => value.replace(/[^\d]/g, ''))
        .test('cpf-cnpj-validator', 'Documento inválido', value => {
            if (!value) return false;
            return cpf.isValid(value) || cnpj.isValid(value);
        }),
    country: Yup.string(),
    street: Yup.string()
        .transform(transformTrim)
        .required('O campo Rua é obrigatório'),
    number: Yup.string()
        .transform(transformTrim)
        .required('O campo Número é obrigatório'),
    complement: Yup.string().transform(transformTrim),
    neighborhood: Yup.string()
        .transform(transformTrim)
        .required('O campo Bairro é obrigatório'),
    city: Yup.string()
        .transform(transformTrim).required('O campo Cidade é obrigatório'),
    state: Yup.string()
        .max(3, 'O campo Estado deve ter no max 3 caracteres')
        .min(2, 'O campo Estado deve ter no min 2 caracteres')
        .required('O campo Estado é obrigatório'),
    zipCode: Yup.string()
        .matches(/^[0-9]{5}-[0-9]{3}$/, 'O campo CEP deve ter o formato 00000-000')
        .required('O campo CEP é obrigatório'),
    // gender: Yup.string().oneOf(['Male', 'Female', 'Other']).required()
});

export type ActivateAccount = {
    email: string;
    firstName: string;
    lastName: string;
    crmv: string;
    type: RULES;
    phone: string;
    cpf_cnpj: string;
    country: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
};

export default validate;

