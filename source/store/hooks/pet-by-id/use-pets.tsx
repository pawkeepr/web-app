import { Pet } from '~/entities/Pet'
import useAppQuery from '~/hooks/use-app-query'
import { createPet, createPetByTutor, getPet, updatePet } from '~/services/helpers'
import { fetchPublicMedicalRecords, fetchPublicPet } from '~/services/helpers/pet'
import type { PetMedicalRecords } from '~/types/medical-records'
import type { IMainResponsibleGuardian, IPetV2, PetData } from '~/types/pet-v2'
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

export const usePetPublic = (id_pet: string) => {
    const superKeys = [NAME, id_pet, 'public']

    return useAppQuery<IPetV2>(superKeys, () => fetchPublicPet(id_pet), {
        enabled: !!id_pet,
    })
}

type GetterPetMedicalRecords = PetMedicalRecords & {
    pet_information: PetData
    main_responsible_guardian: IMainResponsibleGuardian
}

export const useMedicalRecordsPublic = (id_pet: string) => {
    const superKeys = ['medical-records', id_pet, 'public']

    return useAppQuery<GetterPetMedicalRecords>(
        superKeys,
        () => fetchPublicMedicalRecords(id_pet),
        {
            enabled: !!id_pet,
        },
    )
}

export default usePetById
