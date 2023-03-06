import * as Yup from 'yup';

const validate = Yup.string()
    .matches(/^[a-zA-Z\s-]+$/, 'O nome deve conter apenas letras, espaços e hífens')
    .max(50, 'O nome deve ter no máximo 50 caracteres')
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
    .required('Este campo é obrigatório')

export default validate;