import useAppQuery from '~/hooks/use-app-query'
import { getPet } from '~/services/helpers'
import type { IPetV2 } from '~/types/pet-v2'

export const NAME = 'pet'

const usePetById = (document: string, pet_id: string) => {
    const superKeys = [NAME, document, pet_id]

    return useAppQuery<IPetV2>(superKeys, getPet.bind(null, document, pet_id), {
        enabled: !!document && !!pet_id,
        // staleTime: TIME // 1 min
    })
}

export default usePetById
