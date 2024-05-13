import * as Yup from 'yup'
import type { RecordsShapeYup } from '~/types/helpers'
import type { Location } from '~/types/profile'

export const locationValidation = Yup.string()
    .trim()
    .min(1, 'O campo deve ter no min 1 caracteres')
export const locationState = Yup.string()
    .trim()
    .max(3, 'O campo Estado deve ter no max 3 caracteres')
    .min(2, 'O campo Estado deve ter no min 2 caracteres')
export const locationZipCode = Yup.string()
    .trim()
    .matches(/^[0-9]{5}-[0-9]{3}$/, 'O campo CEP deve ter o formato 00000-000')

const locationValidationSchema = Yup.object().shape<RecordsShapeYup<Location>>({
    street: locationValidation.required('O campo Rua é obrigatório'),
    number: locationValidation.required('O campo Número é obrigatório'),
    complement: Yup.string(),
    neighborhood: locationValidation.required('O campo Bairro é obrigatório'),
    city: locationValidation.required('O campo Cidade é obrigatório'),
    state: locationState.required('O campo Estado é obrigatório'),
    zipCode: locationZipCode.required('O campo CEP é obrigatório'),
    country: Yup.string(),
})

export type YupAddress = Yup.InferType<typeof locationValidationSchema>

export default locationValidationSchema
