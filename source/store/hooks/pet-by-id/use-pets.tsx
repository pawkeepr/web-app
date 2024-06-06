import { Pet } from '~/entities/Pet'
import { createPet, createPetByTutor, getPet, updatePet } from '~/services/helpers'
import type { IPetV2 } from '~/types/pet-v2'
import { TypeProfile } from '~/types/profile'
import useProfile from '../profile/use-profile'
import useAppStore from '../use-app-store'

export const NAME = 'pet'

const usePetById = (document: string, id_pet: string) => {
    const superKeys = [NAME, document, id_pet]

    const { data: profile } = useProfile()

    const create =
        profile?.type_profile === TypeProfile.TUTOR ? createPetByTutor : createPet

    return useAppStore<IPetV2>({
        get: getPet.bind(null, document, id_pet),
        entity: Pet,
        keys: superKeys,
        add: create,
        name: NAME,
        enabled: !!document,
        update: updatePet.bind(null, document),
    })
}

export default usePetById
