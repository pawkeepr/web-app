// Profile Vet

import { api } from '../api'

const urls = {
    FETCH_HEALTH_PLANS: () => '/api-pet/list-health-insurance',
    UPDATE_HEALTH_PLANS: () => '/api-pet/update-health_insurance-pet',
}

export const getAllHealthPlans = async (id_pet: string, cpf_cnpj: string) =>
    api.get(urls.FETCH_HEALTH_PLANS(), {
        params: { id_pet, cpf_cnpj },
    })

export const updateHealthPlans = async (
    data: unknown,
    id_pet: string,
    cpf_cnpj: string,
) =>
    api.put(urls.UPDATE_HEALTH_PLANS(), data, {
        params: { id_pet, cpf_cnpj },
    })
