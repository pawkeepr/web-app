// Profile Vet

import type { IHealthPlan } from '~/validations/health-plans'
import { api } from '../api'

const urls = {
    FETCH_HEALTH_PLANS: () => '/api-pet/list-health-insurance',
    UPDATE_HEALTH_PLANS: () => '/api-pet/update-health_insurance-pet',
    CREATE_HEALTH_PLANS: () => '/api-pet/insert-health_insurance-pet',
    DELETE_HEALTH_PLANS: () => '/api-pet/delete-health_insurance-pet',
}

export const getAllHealthPlans = async (id_pet: string, cpf_cnpj: string) =>
    api.get<IHealthPlan[]>(urls.FETCH_HEALTH_PLANS(), {
        params: { id_pet, cpf_cnpj },
    })

export const updateHealthPlans = async (
    data: IHealthPlan,
    id_pet: string,
    number_health: string,
    cpf_cnpj: string,
) =>
    api.put(urls.UPDATE_HEALTH_PLANS(), data, {
        params: { id_pet, cpf_cnpj, number_health },
    })

export const createHealthPlans = async (
    data: IHealthPlan,
    id_pet: string,
    cpf_cnpj: string,
) =>
    api.post(urls.CREATE_HEALTH_PLANS(), data, {
        params: { id_pet, cpf_cnpj },
    })

export const deleteHealthPlans = async (
    id_pet: string,
    number_health: string,
    cpf_cnpj: string,
) =>
    api.delete(urls.DELETE_HEALTH_PLANS(), {
        params: { id_pet, cpf_cnpj, number_health },
    })
