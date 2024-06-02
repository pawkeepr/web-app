import {
    useMutation,
    useQueryClient,
    type DefaultError,
    type UseMutationOptions,
} from '@tanstack/react-query'
import { createErrorToast, createSuccessToast } from '~/store/helpers/toast'

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

    const onSettledCallback =
        onSettled ||
        (() => {
            return queryClient.invalidateQueries({
                queryKey: [...mutationKey],
            })
        })

    return useMutation({
        ...options,
        onError,
        onSuccess,
        onSettled: onSettledCallback,
    })
}

export default useMutationHelper
