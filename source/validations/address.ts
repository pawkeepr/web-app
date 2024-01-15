import * as Yup from 'yup'
import type { RecordsShapeYup } from '~/types/helpers'
import type { Location } from '~/types/profile'

const locationValidationSchema = Yup.object().shape<RecordsShapeYup<Location>>({
    street: Yup.string().trim().required('O campo Rua é obrigatório'),
    number: Yup.string().trim().required('O campo Número é obrigatório'),
    complement: Yup.string().trim(),
    neighborhood: Yup.string().trim().required('O campo Bairro é obrigatório'),
    city: Yup.string().trim().required('O campo Cidade é obrigatório'),
    state: Yup.string()
        .max(3, 'O campo Estado deve ter no max 3 caracteres')
        .min(2, 'O campo Estado deve ter no min 2 caracteres')
        .required('O campo Estado é obrigatório'),
    zipCode: Yup.string()
        .matches(/^[0-9]{5}-[0-9]{3}$/, 'O campo CEP deve ter o formato 00000-000')
        .required('O campo CEP é obrigatório'),
    country: Yup.string(),
})

export type YupAddress = Yup.InferType<typeof locationValidationSchema>

export default locationValidationSchema
