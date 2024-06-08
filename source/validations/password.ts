import * as Yup from 'yup'

export const rulePassLength = Yup.string().min(
    8,
    'A senha deve ter pelo menos 8 caracteres',
)
export const rulePassLower = Yup.string().matches(
    /(.*[a-z].*)/,
    'É necessário pelo menos uma letra minúscula',
)
export const rulePassUpper = Yup.string().matches(
    /(.*[A-Z].*)/,
    'É necessário pelo menos uma letra maiúscula',
)
export const rulePassNumber = Yup.string().matches(
    /(.*[0-9].*)/,
    'É necessário pelo menos um número',
)
export const rulePassSpecial = Yup.string().matches(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    'A senha deve conter pelo menos um caractere especial',
)

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
