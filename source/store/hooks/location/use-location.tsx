import useAppQuery from '~/hooks/use-app-query'
import { getPetLocation } from '~/services/helpers/pet'
import useProfile from '../profile/use-profile'

type UseHookLocation = {
    id_pet: string
}

const NAME = 'location'
export const useGetReadQRCodeLocation = ({ id_pet }: UseHookLocation) => {
    const { data } = useProfile()
    const cpf_cnpj = data?.user_information?.cpf_cnpj as string
    return useAppQuery<unknown>(
        [NAME, id_pet, cpf_cnpj],
        getPetLocation.bind(null, cpf_cnpj, id_pet),
    )
}
