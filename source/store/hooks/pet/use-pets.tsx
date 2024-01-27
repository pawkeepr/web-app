import { Pet } from '~/entities/Pet'
import { createPet, getPet, updatePet } from '~/services/helpers'
import type { IPetV2 } from '~/types/pet-v2'
import useAppStore from '../use-app-store'

export const NAME = 'pet'

const usePetById = (document: string, id_pet: string) => {
    const superKeys = [NAME, document, id_pet]

    return useAppStore<IPetV2>({
        get: getPet.bind(null, document, id_pet),
        entity: Pet,
        keys: superKeys,
        add: createPet,
        name: NAME,
        enabled: !!document,
        update: updatePet.bind(null, document),
    })
}

export default usePetById
