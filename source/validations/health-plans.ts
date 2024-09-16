import * as Yup from 'yup'
import type { RecordsShapeYup } from '~/types/helpers'

export type IHealthPlan = {
    id: string
    name: string
    type_health: string
    number_health: string
    validity: string
    dat_ini: string
    dat_end: string
}

export const validationSchema = Yup.object().shape<RecordsShapeYup<IHealthPlan>>({
    name: Yup.string().required('O campo nome é obrigatório'),
    type_health: Yup.string().required('O campo tipo de plano é obrigatório'),
    number_health: Yup.string().required('O campo número de plano é obrigatório'),
    validity: Yup.string().required('O campo validade é obrigatório'),
    dat_ini: Yup.date().optional(),
    dat_end: Yup.date().optional(),
    id: Yup.string().optional(),
})
