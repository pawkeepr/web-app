import useAppQuery from '~/hooks/use-app-query'
import { getAllPets } from '~/services/helpers'
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
