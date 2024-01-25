import useAppQuery from '~/hooks/use-app-query'
import { getAllTutorsOfClinic } from '~/services/helpers'
import type { ITutor } from '~/types/pet-v2'

export const NAME = 'list-tutors'

export type ITutorV2Data = ITutor & {
    id: string
}

const useListTutors = () => {
    const superKeys = [NAME]

    return useAppQuery<ITutorV2Data[]>(superKeys, getAllTutorsOfClinic, {
        initialData: [],
        // staleTime: TIME // 1 min
    })
}

export default useListTutors
