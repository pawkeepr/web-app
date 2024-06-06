import useAppQuery from '~/hooks/use-app-query'
import { getAllUberVets, type UberVetGetter } from '~/services/helpers/uber-vet'
import useProfile from '../profile/use-profile'

const NAME = 'uber'

export const useListUberVet = () => {
    const { data: profile } = useProfile()

    const location: UberVetGetter = {
        city: profile?.user_information?.address?.city,
    }

    return useAppQuery(
        [NAME, 'list-uber-vet', profile?.user_information?.address?.city],
        () => getAllUberVets(location),
        {
            enabled: !!profile?.user_information?.address?.city,
            initialData: [],
        },
    )
}
