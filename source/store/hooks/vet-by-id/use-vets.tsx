import useAppQuery from "~/hooks/use-app-query"
import { fetchPublicProfileById } from "~/services/helpers/profile"
import type { IProfile } from '~/types/profile'

const NAME = 'vet'

export const useVetById = (id_vet: string) => {
    const superKeys = [NAME, id_vet]

    return useAppQuery<IProfile>(superKeys, () => fetchPublicProfileById(id_vet), {
        enabled: !!id_vet,
    })
}

export default useVetById