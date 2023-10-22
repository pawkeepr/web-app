import { createPet, getAllPets } from '~/services/helpers'
import { IPet } from '~/types/pet'
import useAppStore from '../use-app-store'

export const NAME = 'pets'

const usePetsByDocument = (
    document: string
) => {
    const superKeys = [NAME, document]

    return useAppStore<IPet>({
        get: getAllPets.bind(null, document),
        add: createPet,
        keys: superKeys,
        name: NAME,
        enabled: !!document,
    })
}

export default usePetsByDocument