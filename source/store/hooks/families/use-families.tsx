import useAppQuery from '~/hooks/use-app-query'
import useMutationHelper from '~/hooks/use-mutation-helper'
import { getAllFamily, updateFamily } from '~/services/helpers/family'
import useProfile from '../profile/use-profile'

type UseHookHealthPlans = {
    id_pet: string
}

const NAME = 'families'
export const useFamilies = ({ id_pet }: UseHookHealthPlans) => {
    const { data } = useProfile()
    const cpf_cnpj = data?.user_information?.cpf_cnpj as string
    return useAppQuery<unknown>(
        [NAME, id_pet, cpf_cnpj],
        getAllFamily.bind(null, cpf_cnpj, id_pet),
    )
}

export const useUpdateFamiliesMutation = (id_pet: string) => {
    const { data } = useProfile()
    const cpf_cnpj = data?.user_information?.cpf_cnpj as string

    return useMutationHelper({
        mutationKey: [NAME, id_pet, cpf_cnpj],
        mutationFn: async (data: unknown) => updateFamily(data, id_pet, cpf_cnpj),
    })
}
