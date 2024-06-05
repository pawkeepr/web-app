import useMutationHelper from '~/hooks/use-mutation-helper'
import {
    KEYS_TYPE_USERS,
    postFeedback,
    type PostFeedback,
} from '~/services/helpers/feedback'
import { AttributeTypeProfile } from '~/services/helpers/types'
import { successToast } from '~/store/helpers/toast'
import { useAppSelector } from '~/store/hooks'

const NAME = 'feedback'

export const useCreateFeedbackMutation = () => {
    const { user } = useAppSelector((state) => state.Profile)
    const superKeys = [NAME, user?.email]

    const type_profile = user?.['custom:type_profile']

    const type =
        type_profile === AttributeTypeProfile.VETERINARY
            ? KEYS_TYPE_USERS.vet
            : KEYS_TYPE_USERS.tutor

    return useMutationHelper({
        mutationFn: (data: PostFeedback) => postFeedback(data, type),
        mutationKey: superKeys,
        onSuccess: () =>
            successToast('Muito Obrigado! Agradecemos seu tempo e sua mensagem!'),
    })
}
