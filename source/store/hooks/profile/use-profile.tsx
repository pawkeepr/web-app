import useAppQuery from '~/hooks/use-app-query'
import { getVetProfile } from '~/services/helpers'
import type { IProfile } from '~/types/profile'

export const NAME = 'profile'

const useProfile = () => {
    const superKeys = [NAME, document]

    return useAppQuery<IProfile>(superKeys, getVetProfile.bind(null), {
        initialData: {} as IProfile,
        // staleTime: TIME // 1 min
    })
}

export default useProfile
