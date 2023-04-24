import * as Yup from 'yup';

const validate = Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(
        RegExp('(.*[a-z].*)'),
        'É necessário pelo menos uma letra minúscula'
    )
    .matches(
        RegExp('(.*[A-Z].*)'),
        'É necessário pelo menos uma letra maiúscula'
    )
    .matches(RegExp('(.*[0-9].*)'), 'É necessário pelo menos um número')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'A senha deve conter pelo menos um caractere especial')
    .required('Este campo é obrigatório')

export default validate;