// Profile Vet

import { api } from '../api'

const urls = {
    FETCH_HEALTH_PLAIN: () => '/api-pet/list-health-insurance',
    UPDATE_HEALTH_PLAIN: () => '/api-pet/update-health_insurance-pet',
}

export const getAllHealthPlain = async (id_pet: string, cpf_cnpj: string) =>
    api.get(urls.FETCH_HEALTH_PLAIN(), {
        params: { id_pet, cpf_cnpj },
    })

export const updateHealthPlain = async (
    data: unknown,
    id_pet: string,
    cpf_cnpj: string,
) =>
    api.put(urls.UPDATE_HEALTH_PLAIN(), data, {
        params: { id_pet, cpf_cnpj },
    })
