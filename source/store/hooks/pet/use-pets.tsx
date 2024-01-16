import useAppQuery from '~/hooks/use-app-query'
import { getPet } from '~/services/helpers'
import type { IPetV2 } from '~/types/pet-v2'

export const NAME = 'pet'
const TIME = 1000 * 60 * 1 // 1 min
const usePetById = (document: string, pet_id: string) => {
    const superKeys = [NAME, document, pet_id]

    return useAppQuery<IPetV2>(superKeys, getPet.bind(null, document, pet_id), {
        keepPreviousData: true,
        cacheTime: TIME, // 1 min
        enabled: !!document && !!pet_id,
        // staleTime: TIME // 1 min
    })
}

export default usePetById
