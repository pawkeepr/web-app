import * as Yup from 'yup'

const validate = Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(/(.*[a-z].*)/, 'É necessário pelo menos uma letra minúscula')
    .matches(/(.*[A-Z].*)/, 'É necessário pelo menos uma letra maiúscula')
    .matches(/(.*[0-9].*)/, 'É necessário pelo menos um número')
    .matches(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        'A senha deve conter pelo menos um caractere especial',
    )
    .required('Este campo é obrigatório')

export default validate
