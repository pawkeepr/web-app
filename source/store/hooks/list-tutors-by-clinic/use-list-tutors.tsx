import useAppQuery from '~/hooks/use-app-query'
import { getAllTutorsOfClinic } from '~/services/helpers'
import type { IMainResponsibleGuardian } from '~/types/pet-v2'

export const NAME = 'list-tutors'

const useListTutors = () => {
    const superKeys = [NAME]

    return useAppQuery<IMainResponsibleGuardian[]>(
        superKeys,
        getAllTutorsOfClinic,
        {
            initialData: [],
            // staleTime: TIME // 1 min
        },
    )
}

export default useListTutors
