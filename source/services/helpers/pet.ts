import { api } from '../api'

const urls = {
    FETCH_PROFILE_PET: () => '/api-pet/pet-was-found',
}

export const fetchPublicPet = async (id_pet: string) =>
    api.get(urls.FETCH_PROFILE_PET(), {
        params: { id_pet },
    })
