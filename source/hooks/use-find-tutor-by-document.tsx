import { useAppSelector } from '~/store/hooks'
import { ITutor } from '~/store/tutors/types'

const useFindTutorByDocument = (document: string): ITutor | undefined => {
    const tutors = useAppSelector(state => state.Tutor.data)

    return tutors.find(tutor => tutor.document.replace(/\D/g, '') === document.replace(/\D/g, ''))
}

export default useFindTutorByDocument