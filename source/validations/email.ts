import * as Yup from 'yup';

const validate = Yup.string()
    .email('Digite um email válido')
    .required('Este campo é obrigatório')
export default validate;