import {
    useQuery,
    type QueryFunction,
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

    return useQuery<T>({
        queryKey: key,
        queryFn: fn as unknown as QueryFunction<T>,
        ...options,
    })
}

export default useAppQuery
