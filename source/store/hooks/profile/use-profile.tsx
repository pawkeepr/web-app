import { cnpj, cpf } from 'cpf-cnpj-validator'
import * as Yup from 'yup'
import useAppQuery from '~/hooks/use-app-query'
import {
    getTutorProfile,
    getTutorProfileFromVet,
    getVetProfile,
} from '~/services/helpers'
import { AttributeTypeProfile } from '~/services/helpers/types'
import { useAppSelector } from '~/store/hooks'
import type { IProfile } from '~/types/profile'

export const NAME = 'profile'

const useProfile = () => {
    const { user } = useAppSelector((state) => state.Profile)
    const superKeys = [NAME, user?.email]

    const type = user?.['custom:type_profile']

    const getProfile =
        type === AttributeTypeProfile.VETERINARY ? getVetProfile : getTutorProfile

    return useAppQuery<IProfile>(superKeys, getProfile.bind(null), {
        enabled: !!user,
    })
}

const validationDocument = Yup.string()
    .required('Este campo é obrigatório')
    .transform((value) => value.replace(/[^\d]/g, ''))
    .test('cpf-cnpj-validator', 'CPF/CNPJ inválido', (value) => {
        if (!value) return false
        return cpf.isValid(value) || cnpj.isValid(value)
    })

export const useTutorProfileFromVet = ({ cpf_cnpj }: { cpf_cnpj: string }) => {
    const number = cpf_cnpj.replace(/[^\d]/g, '')
    const superKeys = [NAME, number]

    return useAppQuery<IProfile>(
        superKeys,
        getTutorProfileFromVet.bind(null, `${number}@pawkeepr.com.br`),
        {
            enabled: !!number && validationDocument.isValidSync(number),
        },
    )
}

export default useProfile
