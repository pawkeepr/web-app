import useAppQuery from "~/hooks/use-app-query"
import { ProfileUserInformation } from "~/types/profile"
import { fetchPublicProfileById } from "~/services/helpers/profile"

const NAME = 'vet'

export const useVetById = (id_vet: string) => {
    const superKeys = [NAME, id_vet]

    return useAppQuery<ProfileUserInformation>(superKeys, () => fetchPublicProfileById(id_vet), {
        enabled: !!id_vet,
    })
}

export default useVetById