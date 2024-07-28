import { cnpj, cpf } from 'cpf-cnpj-validator'
import * as Yup from 'yup'
import useAppQuery from '~/hooks/use-app-query'
import useMutationHelper from '~/hooks/use-mutation-helper'
import {
    getTutorProfile,
    getTutorProfileFromVet,
    getVetProfile,
} from '~/services/helpers'
import { KEYS_TYPE_USER_BY_NUMBER } from '~/services/helpers/feedback'
import {
    getSignedUrl,
    updateProfilePicture,
    updateProfileV2,
} from '~/services/helpers/profile'
import { AttributeTypeProfile } from '~/services/helpers/types'
import { errorToast, infoToast } from '~/store/helpers/toast'
import { useAppSelector } from '~/store/hooks'
import type { IProfile } from '~/types/profile'

export const NAME = 'profile'

const staleTime = 1000 * 60 * 60 * 24 // 24 hours

const makeFetchProfile = (type?: AttributeTypeProfile) => {
    return type === AttributeTypeProfile.VETERINARY
        ? getVetProfile
        : getTutorProfile
}

const useProfile = () => {
    const { user } = useAppSelector((state) => state.Login)

    const superKeys = [NAME]

    const type = user?.['custom:type_profile']

    const getProfile = makeFetchProfile(type)

    return useAppQuery<IProfile>(superKeys, getProfile.bind(null), {
        enabled: !!user,
        staleTime: user ? staleTime : 0,
    })
}

export const useUpdateProfileMutation = () => {
    const { data: profile } = useProfile()

    const type_profile = profile?.type_profile

    return useMutationHelper({
        mutationFn: (data: IProfile) =>
            updateProfileV2(data, KEYS_TYPE_USER_BY_NUMBER[type_profile || 1]),
        mutationKey: [NAME],
        onSuccess: () => infoToast('Perfil atualizado com sucesso'),
        onError: () => errorToast('Erro ao atualizar perfil'),
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

type GetSignedUrl = {
    url: string
    filename: string
}

export const useGetSignedUrl = () => {
    return useAppQuery<GetSignedUrl>([NAME, 'signed-url'], getSignedUrl)
}

export const useMutationUpdateProfilePhoto = () => {
    const { data } = useGetSignedUrl()

    const url = data?.url || ''

    return useMutationHelper({
        mutationFn: (data: FormData) => updateProfilePicture(data, url),
        mutationKey: [NAME, 'photo', url],
        onSuccess: () => infoToast('Foto de perfil atualizada com sucesso'),
        onError: () => errorToast('Erro ao atualizar foto de perfil.'),
    })
}

export const useProfilePhoto = () => {
    const superKeys = [NAME, 'photo']

    return useAppQuery<string>(
        superKeys,
        () => {
            return {
                data: '',
            }
        },
        {
            enabled: false,
        },
    )
}

export default useProfile
