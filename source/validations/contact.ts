import * as Yup from 'yup'
import type { RecordsShapeYup } from '~/types/helpers'
import type { Contact } from '~/types/profile'

export const validateEmail = Yup.string().email('E-mail inválido')

export const validatePhone = Yup.string().test(
    'whatsapp-validator',
    'Número de telefone inválido',
    (value) => {
        if (!value) return false
        const phone = value.replace(/\D/g, '')
        return phone.length >= 12
    },
)

const contactValidationSchema = Yup.object().shape<RecordsShapeYup<Contact>>({
    email: validateEmail.required('O campo de email é obrigatório'),
    phone: validatePhone.required('O campo de telefone é obrigatório'),
    whatsapp: validatePhone.required('O campo de whatsapp é obrigatório'),
    facebook: Yup.string().optional(),
    instagram: Yup.string().optional(),
    twitter: Yup.string().optional(),
    linkedIn: Yup.string().optional(),
    youtube: Yup.string().optional(),
})

export type YupContact = Yup.InferType<typeof contactValidationSchema>

export default contactValidationSchema
