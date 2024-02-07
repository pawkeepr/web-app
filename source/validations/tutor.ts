import * as Yup from 'yup'

const validate = Yup.object().shape({
    firstName: Yup.string()
        .trim()
        .min(2, 'O nome deve ter pelo menos 2 caracteres')
        .max(50, 'O nome deve ter no máximo 50 caracteres')
        .required('O campo de nome é obrigatório'),
    lastName: Yup.string()
        .trim()
        .min(2, 'O sobrenome deve ter pelo menos 2 caracteres')
        .max(155, 'O sobrenome deve ter no máximo 50 caracteres')
        .required('O campo de sobrenome é obrigatório'),
    contact: Yup.object()
        .shape({
            email: Yup.string()
                .email('E-mail inválido')
                .required('O campo de e-mail é obrigatório'),
            whatsapp: Yup.string()
                .matches(/^\+55 \(\d{2}\) \d \d{4}-\d{4}$/)
                .test(
                    'whatsapp-validator',
                    'Número de telefone inválido',
                    (value) => {
                        if (!value) return false
                        return value.length >= 10
                    },
                )
                .required(),
        })
        .required(),
    cpf_cnpj: Yup.string()
        .required('Este campo é obrigatório')
        .transform((value) => value.replace(/[^\d]/g, '')),
})

export type Tutor = Yup.InferType<typeof validate>

export default validate
