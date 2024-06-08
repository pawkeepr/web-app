import {
    useQuery,
    type QueryKey,
    type UseQueryOptions,
} from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { useAppSelector } from '~/store/hooks'

export type Fn<T> = () => Promise<AxiosResponse<T>>

const useAppQuery = <T,>(
    key: QueryKey,
    fn: Fn<T>,
    options?: Omit<UseQueryOptions<T>, 'queryKey'>,
) => {
    const { user } = useAppSelector((state) => state.Profile)

    const Fn = () => fn?.()

    return useQuery<T>({
        queryKey: [user?.email, ...key],
        queryFn: async () => {
            const res = await Fn()
            return res.data
        },
        ...options,
    })
}

export default useAppQuery
