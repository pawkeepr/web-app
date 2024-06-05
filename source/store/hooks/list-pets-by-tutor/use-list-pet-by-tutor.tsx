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

export const useListPetsFromTutor = () => {
    return useAppQuery<IPetV2[]>(
        ['listPetsByTutor', document],
        () => getAllPetsTutor(),
        {
            enabled: !!document,
        },
    )
}
