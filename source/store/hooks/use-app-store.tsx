import {
    UseQueryOptions,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { isArray } from 'lodash'
import { useCallback, useMemo } from 'react'
import useAppQuery, { Fn } from '~/hooks/use-app-query'
import { errorToast, infoToast, successToast } from '../helpers/toast'


type Data<T> = T & { _id: string; active: boolean }

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

const TIME = 1000 * 60 // 1 min

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

    const onUpdateMutation = useCallback(async (data: Data<T>) => {
        await queryClient.cancelQueries(superKeys as any)
        const oldData = queryClient.getQueryData<Data<T>[]>(superKeys)

        queryClient.setQueryData(superKeys, (oldData: Data<T>[]) => {
            const index = oldData.findIndex((i) => i._id === data._id)
            if (index !== -1) {
                const newData = [...oldData]
                newData[index] = data
                return newData
            } else {
                return oldData
            }
        })
        return { oldData }
    }, [])

    const updateStatus = useMutation({
        mutationFn: async (data: Data<T>) => {
            const res = await update!(data._id, { active: data.active } as Partial<
                Data<T>
            >)
            return res.data
        },
        // onMutate: onUpdateStatusMutation,
        onSuccess,
        onSettled,
        onError,
    })

    const updateData = useMutation({
        mutationFn: async (data: Data<T>) => {
            const res = await update!(data._id, data)
            return res.data
        },
        onMutate: onUpdateMutation,
        onSuccess,
        onSettled,
        onError,
    })

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

    const deleteData = useMutation({
        mutationFn: async (id: string) => {
            const res = await del!(id)
            return res.data
        },
        onSuccess,
        onError,
        onSettled,
    })

    const handleSubmit = useCallback(
        async (data: Data<T>) => {
            try {
                if (entity) {
                    data = entity.build(data)
                }
                if (data._id) {
                    await updateData.mutateAsync(data)
                    infoToast('Atualizado com sucesso')
                } else {
                    await addData.mutateAsync(data)
                    successToast('Adicionado com sucesso')
                }
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
        [addData, entity, updateData]
    )

    const handleStatus = useCallback(
        async (_id: string, value: boolean, data: Data<T>) => {
            await updateStatus.mutateAsync({ ...data, _id, active: value })
        },
        []
    )

    const handleDelete = useCallback(async (_id: string) => {
        await deleteData.mutateAsync(_id)
    }, [])

    const submitLoading = useMemo(
        () =>
            updateStatus?.isLoading ||
            updateData?.isLoading ||
            addData?.isLoading ||
            deleteData?.isLoading,
        [
            updateStatus?.isLoading,
            updateData?.isLoading,
            addData?.isLoading,
            deleteData?.isLoading,
        ]
    )

    return {
        isLoading,
        activeData: isArray(data) ? data : [],
        error,
        addData,
        updateData,
        isError,
        handleStatus,
        handleSubmit,
        handleDelete,
        submitLoading,
        name
    }
}

export type AppStoreHook = typeof useAppStore

export default useAppStore
