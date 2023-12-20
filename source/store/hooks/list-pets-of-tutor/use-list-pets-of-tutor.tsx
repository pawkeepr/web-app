import { Pet } from '~/entities/Pet'
import { createPet, getAllPets } from '~/services/helpers'
import { IPet } from '~/types/pet'
import { IPetV2 } from '~/types/pet-v2'
import useAppStore from '../use-app-store'

export const NAME = 'list-pets-of-tutor'

const usePetsByTutor = (
    document: string
) => {
    const superKeys = [NAME, document]

    return useAppStore<IPetV2, IPet>({
        get: getAllPets.bind(null, document),
        add: createPet,
        entity: Pet,
        keys: superKeys,
        name: NAME,
        enabled: !!document,
    })
}

export default usePetsByTutor