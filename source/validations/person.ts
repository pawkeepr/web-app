import { cnpj, cpf } from 'cpf-cnpj-validator';
import * as Yup from 'yup';

const transformTrim = (value: any, originalValue: string) => {
    // Remover espaços em branco extras da string
    return typeof originalValue === 'string' ? originalValue.trim() : originalValue;
}

const validate = Yup.object().shape({
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
        })
    // gender: Yup.string().oneOf(['Male', 'Female', 'Other']).required()
});

export type Person = Yup.InferType<typeof validate>;

export default validate;

