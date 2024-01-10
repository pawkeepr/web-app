// CPF or CNPJ
import { cnpj, cpf } from 'cpf-cnpj-validator'
import * as Yup from 'yup'

const validate = Yup.string()
    .required('Este campo é obrigatório')
    .transform((value) => value.replace(/[^\d]/g, ''))
// .test('cpf-cnpj-validator', 'CPF/CNPJ inválido', value => {
//     if (!value) return false;
//     return cpf.isValid(value) || cnpj.isValid(value);
// })

export default validate
