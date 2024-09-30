// Profile Vet

import { api } from '../api'

const urls = {
    FETCH_FAMILY: () => '/api-pet/list-secondary-responsible',
    UPDATE_FAMILY: () => '/api-pet/update-secondary-responsible',
}

export const getAllFamily = async (id_pet: string, cpf_cnpj: string) =>
    api.get(urls.FETCH_FAMILY(), {
        params: { id_pet, cpf_cnpj },
    })

export const updateFamily = async (
    data: unknown,
    id_pet: string,
    cpf_cnpj: string,
) =>
    api.put(urls.UPDATE_FAMILY(), data, {
        params: { id_pet, cpf_cnpj },
    })
