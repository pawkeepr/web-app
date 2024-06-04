import useAppQuery from '~/hooks/use-app-query'
import { getTutorProfile, getVetProfile } from '~/services/helpers'
import { AttributeTypeProfile } from '~/services/helpers/types'
import { useAppSelector } from '~/store/hooks'
import type { IProfile } from '~/types/profile'

export const NAME = 'profile'

const useProfile = () => {
    const { user } = useAppSelector((state) => state.Profile)
    const superKeys = [NAME, document]

    const type = user?.['custom:type_profile']

    const getProfile =
        type === AttributeTypeProfile.VETERINARY ? getVetProfile : getTutorProfile

    return useAppQuery<IProfile>(superKeys, getProfile.bind(null), {
        enabled: !!user,
        staleTime: 1000 * 60 * 60,
    })
}

export default useProfile
