import {
    useMutation,
    useQueryClient,
    type UseQueryOptions,
} from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'
import type { BuilderEntity } from '~/entities/BuilderEntity'
import useAppQuery, { type Fn } from '~/hooks/use-app-query'
import { errorToast, successToast } from '../helpers/toast'

export type FAxiosPost<T = unknown, G = undefined> = (
    data: G extends undefined ? T : T | G,
) => Promise<AxiosResponse<T>>
export type FAxiosUpdate<T = unknown, G = unknown> = (
    id: string,
    data: Partial<T | G>,
) => Promise<AxiosResponse<T>>
export type FAxiosDelete<T = unknown> = (id: string) => Promise<AxiosResponse<T>>

type Stores<T, G> = {
    keys: (string | number)[]
    name: string
    enabled?: boolean
    update?: FAxiosUpdate<T, G>
    del?: FAxiosDelete<T>
    add?: FAxiosPost<T, G>
    get?: Fn<T[]>
    handleCloseModal?: () => void
    entity?: BuilderEntity
    options?: UseQueryOptions<T[]>
    initialData?: T[]
}

const TIME = 1000 * 60 * 5 // 5 min

const useAppStore = <T, G = unknown>({
    keys,
    add,
    update,
    get,
    entity,
    options,
    handleCloseModal,
    enabled = true,
    name,
    initialData,
}: Stores<T, G>) => {
    const superKeys = ['active', ...keys]

    const { isLoading, data, error, isError } = useAppQuery<T[]>(
        superKeys,
        get?.bind(null) as Fn<T[]>,
        {
            ...options,
            keepPreviousData: true,
            staleTime: TIME, // 1 min
            enabled: !!get && enabled,
        },
    )

    const queryClient = useQueryClient()

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const onError = async (_err: unknown, _newData: unknown, context: any) => {
        await errorToast('Houve um erro ', 'Tente novamente')
        queryClient.setQueryData(superKeys, context?.oldData)
    }

    const onSettled = async () => {
        await queryClient?.invalidateQueries({
            predicate: (query) => {
                return query?.queryKey?.includes(name)
            },
        })
    }

    const onSuccess = useCallback(async () => {
        await successToast('Adicionado com sucesso')
        handleCloseModal?.()
    }, [handleCloseModal])

    const addData = useMutation({
        mutationFn: async (data: G extends undefined ? T : T | G) => {
            const res = await add?.(data)

            return res?.data as T
        },
        onSuccess,
        onSettled,
        onError,
    })

    const updateData = useMutation({
        mutationFn: async (data: T | G) => {
            const newData = data as { id?: string } & (T | G)
            if (!newData.id) {
                throw new Error('Id não encontrado')
            }
            const res = await update?.(newData.id, data)
            return res?.data
        },
        onSuccess,
        onSettled,
        onError,
    })

    const handleSubmit = useCallback(
        async (data: T | G) => {
            try {
                const newData = entity ? entity.build(data) : data

                if (newData.id) {
                    return await updateData.mutateAsync(data)
                }

                const { id: _id, ...aux } = newData
                return await addData.mutateAsync(aux)
            } catch (err) {
                const error = err as AxiosError
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
        [addData, entity, updateData],
    )

    const submitLoading = useMemo(
        () => addData?.isLoading || updateData?.isLoading,
        [addData?.isLoading, updateData?.isLoading],
    )

    return {
        isLoading,
        activeData: data ?? initialData,
        error,
        addData,
        isError,
        handleSubmit,
        submitLoading,
        name,
    }
}

export type AppStoreHook = typeof useAppStore

export default useAppStore
