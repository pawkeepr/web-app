import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export type Fn<T> = () => Promise<AxiosResponse<T>>

const useAppQuery = <T,>(
    key: QueryKey,
    fn: Fn<T>,
    options?: UseQueryOptions<T>
) => {
    const Fn = () => fn?.() as any

    return useQuery<T>(
        key,
        async () => {
            const res = await Fn()
            return res.data
        },
        {
            ...options,
            cacheTime: 60 * 1000 * 60 * 24,
        }
    )

}

export default useAppQuery
