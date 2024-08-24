import { useState } from 'react'
import useMutationHelper from '~/hooks/use-mutation-helper'
import {
    postProfilePicture,
    updateProfilePicture,
} from '~/services/helpers/profile'
import {
    AttributeTypeProfile,
    EnumerateTypeProfile,
} from '~/services/helpers/types'
import { errorToast, infoToast } from '~/store/helpers/toast'
import type { IPetV2 } from '~/types/pet-v2'
import useProfile from '../profile/use-profile'

export const NAME_PROFILE = 'pet-profile'

export const useMutationUpdateProfilePhoto = (pet: IPetV2) => {
    const [onProgress, setOnProgress] = useState(0)
    const { refetch } = useProfile()
    const { data: user } = useProfile()
    AttributeTypeProfile

    const onProgressCallback = (value: number) => {
        setOnProgress(value)
    }

    const type =
        EnumerateTypeProfile[
            user?.type_profile as keyof typeof EnumerateTypeProfile
        ]

    const mutation = useMutationHelper({
        mutationFn: async (data: FormData) => {
            const response = await postProfilePicture(
                data,
                type,
                user?.id as string,
                onProgressCallback,
            )

            if (response instanceof Error) {
                console.log(response)
            }

            const {
                data: { fileName },
            } = response

            return await updateProfilePicture(
                {
                    object_name: fileName,
                },
                type,
                user?.id as string,
            )
        },

        mutationKey: [NAME_PROFILE, pet?.id, 'picture'],
        onSuccess: () => {
            refetch()
            onProgressCallback(0)
            infoToast('Foto de perfil atualizada com sucesso')
        },
        onError: () => {
            onProgressCallback(0)
            errorToast('Erro ao atualizar foto de perfil.')
        },
    })

    return {
        ...mutation,
        onProgress,
    }
}
