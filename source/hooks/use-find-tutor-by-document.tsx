import { useAppSelector } from '~/store/hooks'
import { Tutor } from '~/store/tutor/types'

const useFindTutorByDocument = (document: string): Tutor | undefined => {
    const tutors = useAppSelector(state => state.Tutor.tutors)

    return tutors.find(tutor => tutor.document.replace(/\D/g, '') === document.replace(/\D/g, ''))
}

export default useFindTutorByDocument