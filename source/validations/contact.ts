import * as Yup from 'yup'
import type { RecordsShapeYup } from '~/types/helpers'
import type { Contact } from '~/types/profile'

const contactValidationSchema = Yup.object().shape<RecordsShapeYup<Contact>>({
    email: Yup.string()
        .email('O email deve ser válido')
        .required('O campo de email é obrigatório'),
    phone: Yup.string()
        .matches(/^\+55 \(\d{2}\) \d \d{4}-\d{4}$/, 'Número de telefone inválido')
        .test('phone-validator', 'Número de telefone inválido', (value) => {
            if (!value) return false
            return value.length >= 10
        })
        .required('O campo de telefone é obrigatório'),
    whatsapp: Yup.string()
        .matches(/^\+55 \(\d{2}\) \d \d{4}-\d{4}$/, 'Número de telefone inválido')
        .test('phone-validator', 'Número de telefone inválido', (value) => {
            if (!value) return false
            return value.length >= 10
        })
        .required('O campo de whatsapp é obrigatório'),
    facebook: Yup.string().optional(),
    instagram: Yup.string().optional(),
    twitter: Yup.string().optional(),
    linkedIn: Yup.string().optional(),
    youtube: Yup.string().optional(),
})

export type YupContact = Yup.InferType<typeof contactValidationSchema>

export default contactValidationSchema
