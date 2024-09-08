// Profile Vet

import { api } from '../api'

const urls = {
    FETCH_HEALTH_PLANS: () => '/api-pet/list-health-insurance',
    UPDATE_HEALTH_PLANS: () => '/api-pet/update-health_insurance-pet',
}

export type IHealthPlan = {
    id: string
    name: string
    type_health: string
    number_health: string
    validity: string
    dat_ini: string
    dat_end: string
}

export const getAllHealthPlans = async (id_pet: string, cpf_cnpj: string) =>
    api.get<IHealthPlan[]>(urls.FETCH_HEALTH_PLANS(), {
        params: { id_pet, cpf_cnpj },
    })

export const updateHealthPlans = async (
    data: IHealthPlan,
    id_pet: string,
    cpf_cnpj: string,
) =>
    api.put(urls.UPDATE_HEALTH_PLANS(), data, {
        params: { id_pet, cpf_cnpj },
    })
