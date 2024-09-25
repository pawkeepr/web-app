import useAppQuery from '~/hooks/use-app-query'
import useMutationHelper from '~/hooks/use-mutation-helper'
import {
    createHealthPlans,
    deleteHealthPlans,
    getAllHealthPlans,
    updateHealthPlans,
} from '~/services/helpers/health-plans'
import { handleSubmitHelper } from '~/store/helpers/handle-submit-helper'
import { infoToast } from '~/store/helpers/toast'
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

export const useUpdateHealthPlansMutation = (
    id_pet: string,
    number_health: string,
) => {
    const { data } = useProfile()
    const cpf_cnpj = data?.user_information?.cpf_cnpj as string

    return useMutationHelper({
        mutationKey: [NAME, id_pet, number_health, cpf_cnpj],
        mutationFn: async (data: IHealthPlan) =>
            updateHealthPlans(data, id_pet, number_health, cpf_cnpj),
        onSuccess: () => {
            infoToast('Plano de saúde atualizado com sucesso')
        },
    })
}

export const useCreateHealthPlansMutation = (id_pet: string) => {
    const { data } = useProfile()
    const cpf_cnpj = data?.user_information?.cpf_cnpj as string

    return useMutationHelper({
        mutationKey: [NAME, id_pet, cpf_cnpj],
        mutationFn: async (data: IHealthPlan) =>
            createHealthPlans(data, id_pet, cpf_cnpj),
    })
}

export const useDeleteHealthPlansMutation = (
    id_pet: string,
    number_health: string,
) => {
    const { data } = useProfile()
    const cpf_cnpj = data?.user_information?.cpf_cnpj as string

    return useMutationHelper({
        mutationKey: [NAME, id_pet, cpf_cnpj],
        mutationFn: async () => deleteHealthPlans(id_pet, number_health, cpf_cnpj),
        onSuccess: () => {
            infoToast('Plano de saúde excluído com sucesso')
        },
    })
}

type HandleSubmitHealthPlans = {
    id_pet: string
    number_health?: string | null
    finallySubmit?: () => unknown
}

export const handleSubmitHealthPlans = ({
    id_pet,
    finallySubmit,
    number_health = null,
}: HandleSubmitHealthPlans) => {
    const createdMutation = useCreateHealthPlansMutation(id_pet)
    const updatedMutation = useUpdateHealthPlansMutation(
        id_pet,
        number_health as string,
    )

    return (data: IHealthPlan) => {
        return handleSubmitHelper({
            createMutation: createdMutation,
            updateMutation: updatedMutation,
            data: {
                ...data,
                id: number_health || null,
            },
            onSubmit: finallySubmit,
        })
    }
}
