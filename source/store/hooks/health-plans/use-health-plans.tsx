import useAppQuery from '~/hooks/use-app-query'
import useMutationHelper from '~/hooks/use-mutation-helper'
import {
    getAllHealthPlans,
    updateHealthPlans,
    type IHealthPlan,
} from '~/services/helpers/health-plans'
import useProfile from '../profile/use-profile'

type UseHookHealthPlans = {
    id_pet: string
}

const NAME = 'health-plans'
export const useHealthPlans = ({ id_pet }: UseHookHealthPlans) => {
    const { data } = useProfile()
    const cpf_cnpj = data?.user_information?.cpf_cnpj as string
    return useAppQuery<IHealthPlan[]>(
        [NAME, id_pet, cpf_cnpj],
        getAllHealthPlans.bind(null, cpf_cnpj, id_pet),
    )
}

export const useUpdateHealthPlansMutation = (id_pet: string) => {
    const { data } = useProfile()
    const cpf_cnpj = data?.user_information?.cpf_cnpj as string

    return useMutationHelper({
        mutationKey: [NAME, id_pet, cpf_cnpj],
        mutationFn: async (data: IHealthPlan) =>
            updateHealthPlans(data, id_pet, cpf_cnpj),
    })
}
