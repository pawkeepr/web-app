import {
    UseQueryOptions,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { isArray } from 'lodash'
import { useCallback, useMemo } from 'react'
import useAppQuery, { Fn } from '~/hooks/use-app-query'
import { errorToast, successToast } from '../helpers/toast'


type Data<T> = T & { id?: string }

type Stores<T> = {
    keys: (string | number)[]
    name: string
    enabled?: boolean
    update?: (
        id: string,
        data: Partial<Data<T>>
    ) => Promise<AxiosResponse<Data<T>>>
    del?: (id: string) => Promise<AxiosResponse<Data<T>>>
    add?: (data: Data<T>) => Promise<AxiosResponse<Data<T>>>
    get?: Fn<T[]>
    handleCloseModal?: () => void
    entity?: {
        build: (data: Data<T>) => Data<T>
    }
    options?: UseQueryOptions<T[]>
}

const TIME = 1000 * 60 * 5 // 5 min

const useAppStore = <T,>({
    keys,
    add,
    update,
    get,
    del,
    entity,
    options,
    handleCloseModal,
    enabled = true,
    name
}: Stores<T>) => {
    const superKeys = ['active', ...keys]

    const { isLoading, data, error, isError } = useAppQuery<T[]>(superKeys, get!, {
        ...options,
        initialData: [],
        keepPreviousData: true,
        cacheTime: TIME, // 1 min
        enabled: !!get && enabled,
        // staleTime: TIME // 1 min
    })

    const queryClient = useQueryClient()

    const onError = (_err: any, _newData: any, context: any) => {
        queryClient.setQueryData(superKeys, context.oldData)
    }

    const onSettled = async () => {
        await queryClient.invalidateQueries(superKeys)
    }

    const onSuccess = useCallback(async (data: Data<T>) => {
        handleCloseModal?.()
    }, [handleCloseModal])

    const onAddMutation = async (data: Data<T>) => {
        await queryClient.cancelQueries(superKeys)
        const oldData = queryClient.getQueryData<Data<T>[]>(superKeys)

        const setOldData = (oldData: Data<T>[]) => [
            ...oldData,
            data,
        ]

        queryClient.setQueryData(superKeys, setOldData as any)

        return { oldData }
    }

    const addData = useMutation({
        mutationFn: async (data: Data<T>) => {
            const res = await add!(data)
            return res.data
        },
        onMutate: onAddMutation,
        onSuccess,
        onSettled,
        onError,
    })

    const handleSubmit = useCallback(
        async (data: Data<T>) => {
            try {
                if (entity) {
                    data = entity.build(data)
                }

                const response = await addData.mutateAsync(data)
                successToast('Adicionado com sucesso')
                return response

            } catch (err) {

                const error = err as AxiosError;
                const statusCode = error?.response?.status

                const msg =
                    typeof error?.response?.data === 'string'
                        ? error?.response?.data
                        : 'Pedimos desculpas, houve um erro'

                if (statusCode === 401) {
                    errorToast('Você não tem permissão para isso', 'Não autorizado')
                    return
                }

                errorToast(msg, 'Tente novamente')

            }
        },
        [addData, entity]
    )

    const submitLoading = useMemo(
        () =>
            addData?.isLoading,
        [
            addData?.isLoading,
        ]
    )

    return {
        isLoading,
        activeData: isArray(data) ? data : [],
        error,
        addData,
        isError,
        handleSubmit,
        submitLoading,
        name
    }
}

export type AppStoreHook = typeof useAppStore

export default useAppStore
