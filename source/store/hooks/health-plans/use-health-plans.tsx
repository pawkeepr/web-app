import useAppQuery from '~/hooks/use-app-query'
import useMutationHelper from '~/hooks/use-mutation-helper'
import {
    getAllHealthPlans,
    updateHealthPlans,
} from '~/services/helpers/health-plans'
import { handleSubmitHelper } from '~/store/helpers/handle-submit-helper'
import type { IHealthPlan } from '~/validations/health-plans'
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
        getAllHealthPlans.bind(null, id_pet, cpf_cnpj),
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

type HandleSubmitHealthPlans = {
    id_pet: string
    finallySubmit?: () => unknown
}

export const handleSubmitHealthPlans = ({
    id_pet,
    finallySubmit,
}: HandleSubmitHealthPlans) => {
    const createdMutation = useUpdateHealthPlansMutation(id_pet)
    const updatedMutation = useUpdateHealthPlansMutation(id_pet)

    return (data: IHealthPlan) => {
        return handleSubmitHelper({
            createMutation: createdMutation,
            updateMutation: updatedMutation,
            data,
            onSubmit: finallySubmit,
        })
    }
}
