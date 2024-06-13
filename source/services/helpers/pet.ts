import { api } from '../api'

const urls = {
    FETCH_PROFILE_PET: () => '/api-pet/pet-was-found',
    FETCH_PROFILE_MEDICAL_RECORDS: () => '/api-medical-external/search-medical-pet-external',
}

export const fetchPublicPet = async (id_pet: string) =>
    api.get(urls.FETCH_PROFILE_PET(), {
        params: { id_pet },
    })

export const fetchPublicMedicalRecords = async (id_pet: string) =>
    api.get(urls.FETCH_PROFILE_MEDICAL_RECORDS(), {
        params: { id_pet },
    })
