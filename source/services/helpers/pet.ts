import { api } from '../api'

const urls = {
    FETCH_PROFILE_PET: () => '/api-external/pet-was-found',
    FETCH_PROFILE_VERIFY: () => '/api-external/pet-was-verify',
    FETCH_PROFILE_MEDICAL_RECORDS: () => '/api-external/search-medical-pet',
}

export const fetchPublicPet = async (id_pet: string) =>
    api.get(urls.FETCH_PROFILE_PET(), {
        params: { id_pet },
    })

export const fetchPublicMedicalRecords = async (id_pet: string) =>
    api.get(urls.FETCH_PROFILE_MEDICAL_RECORDS(), {
        params: { id_pet },
    })

export const fetchPublicPetVerify = async (id_pet: string) =>
    api.get(urls.FETCH_PROFILE_VERIFY(), {
        params: { id_pet },
    })
