import {
    useQuery,
    type QueryKey,
    type UseQueryOptions,
} from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

export type Fn<T> = () => Promise<AxiosResponse<T>>

const useAppQuery = <T,>(
    key: QueryKey,
    fn: Fn<T>,
    options?: Omit<UseQueryOptions<T>, 'queryKey'>,
) => {
    const Fn = () => fn?.()

    return useQuery<T>({
        queryKey: key,
        queryFn: async () => {
            const res = await Fn()
            return res.data
        },
        ...options,
    })
}

export default useAppQuery
