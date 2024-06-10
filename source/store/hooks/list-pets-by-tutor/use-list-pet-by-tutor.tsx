import useAppQuery from '~/hooks/use-app-query'
import { getAllPets, getAllPetsTutor } from '~/services/helpers'
import type { IPetV2 } from '~/types/pet-v2'

type UseListPetsByTutorProps = {
    document: string
}

const useListPetsByTutor = ({ document }: UseListPetsByTutorProps) => {
    return useAppQuery<IPetV2[]>(
        ['listPetsByTutor', document],
        () => getAllPets(document),
        {
            enabled: !!document,
        },
    )
}

export default useListPetsByTutor

export interface Pet {
    approximate_date: string | null
    blood_donator: string
    blood_type: string
    castrated: string
    color: string
    date_birth: string
    date_update: string
    id_pet: string
    identification_number: string
    microchip: string
    name_pet: string
    organ_donor: string
    pedigree: string
    pedigree_registry: string
    race: string
    sex: string
    size: string
    specie: string
    weight: string
}

export const useListPetsFromTutor = () => {
    return useAppQuery<Pet[]>(['listPetsByTutor'], () => getAllPetsTutor())
}
