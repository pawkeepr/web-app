import useAppQuery from '~/hooks/use-app-query'
import { getAllPetsOfClinic } from '~/services/helpers'
import type { IPetV2Data } from '~/types/pet-v2'

export const NAME = 'list-pets'

const useListPets = () => {
    const superKeys = [NAME]

    return useAppQuery<IPetV2Data[]>(superKeys, getAllPetsOfClinic, {
        staleTime: 1000,
    })
}

export default useListPets
