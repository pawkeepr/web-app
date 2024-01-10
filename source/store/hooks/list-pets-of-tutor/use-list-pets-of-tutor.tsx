import { BuilderEntity } from '~/entities/BuilderEntity'
import { Pet } from '~/entities/Pet'
import { PetSimplified } from '~/entities/PetSimplified'
import { createPet, createPetSimplified, getAllPets } from '~/services/helpers'
import { IPet } from '~/types/pet'
import { IPetV2 } from '~/types/pet-v2'
import useAppStore from '../use-app-store'

export const NAME = 'list-pets-of-tutor'

const createStrategy = new Map([
    ['simple', createPetSimplified],
    ['full', createPet],
])

const entityStrategy = new Map<string, BuilderEntity>([
    ['simple', PetSimplified],
    ['full', Pet],
])

const usePetsByTutor = (
    document: string,
    strategy: 'simple' | 'full' = 'full',
    handleCloseModal?: () => void,
) => {
    const superKeys = [NAME, document]

    const create = createStrategy.get(strategy) || createPet
    const entity = entityStrategy.get(strategy) || Pet

    return useAppStore<IPetV2, IPet>({
        get: getAllPets.bind(null, document),
        add: create,
        entity: entity,
        keys: superKeys,
        name: NAME,
        handleCloseModal,
        enabled: !!document,
    })
}

export default usePetsByTutor
