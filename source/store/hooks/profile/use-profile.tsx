import useAppQuery from '~/hooks/use-app-query'
import { getVetProfile } from '~/services/helpers'
import { IProfile } from '~/types/profile'

export const NAME = 'profile'
const TIME = 1000 * 60 * 1 // 1 min

const useProfile = () => {
    const superKeys = [NAME, document]

    return useAppQuery<IProfile>(superKeys, getVetProfile.bind(null), {
        initialData: {} as IProfile,
        cacheTime: TIME, // 1 min
        // staleTime: TIME // 1 min
    })
}

export default useProfile