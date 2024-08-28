import useAppQuery from '~/hooks/use-app-query'
import { getAllPetsOfClinic } from '~/services/helpers'
import type { Pet } from '~/types/pet-v2'

export const NAME = 'list-pets'

const useListPets = () => {
    const superKeys = [NAME]

    return useAppQuery<Pet[]>(superKeys, getAllPetsOfClinic, {
        staleTime: 1000,
    })
}

export default useListPets
