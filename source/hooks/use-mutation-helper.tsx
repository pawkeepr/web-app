import {
    useMutation,
    useQueryClient,
    type DefaultError,
    type UseMutationOptions,
} from '@tanstack/react-query'
import { createErrorToast, createSuccessToast } from '~/store/helpers/toast'
import useProfile from '~/store/hooks/profile/use-profile'

type UseMutation = <
    TData = unknown,
    TError = DefaultError,
    TVariables = void,
    TContext = unknown,
>(
    options: UseMutationOptions<TData, TError, TVariables, TContext>,
) => ReturnType<typeof useMutation<TData, TError, TVariables, TContext>>

const useMutationHelper: UseMutation = ({
    onSettled,
    onSuccess = () => createSuccessToast(),
    onError = () => createErrorToast(),
    mutationKey,
    ...options
}) => {
    const queryClient = useQueryClient()
    const { data: profile } = useProfile()

    const email = profile?.user_information?.contact?.email
    const keys = Array.isArray(mutationKey) ? mutationKey : [mutationKey]

    const onSettledCallback =
        onSettled ||
        (() => {
            return queryClient.invalidateQueries({
                queryKey: [email, ...keys],
            })
        })

    return useMutation({
        ...options,
        mutationKey: [email, ...keys],
        onError,
        onSuccess,
        onSettled: onSettledCallback,
    })
}

export default useMutationHelper
