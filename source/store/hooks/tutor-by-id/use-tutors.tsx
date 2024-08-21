import useAppQuery from '~/hooks/use-app-query'
import { getTutorById } from '~/services/helpers'
import { ITutor } from '~/types/pet-v2'
export const NAME = 'tutor'

const useTutors = (id_tutor: string) => {
    const superKeys = [NAME, id_tutor]
    
    return useAppQuery<ITutor[]>(
        superKeys,
        getTutorById(id_tutor),
        {
            staleTime: 100 
        },
    )
}

export default useTutors
