import useAppQuery from '~/hooks/use-app-query'
import { getPetLocation } from '~/services/helpers/pet'
import type { IGeolocationAppointment } from '~/types/appointment'
import useProfile from '../profile/use-profile'

type UseHookLocation = {
    id_pet: string
}

const NAME = 'location'
export const useGetReadQRCodeLocation = ({ id_pet }: UseHookLocation) => {
    const { data } = useProfile()
    const cpf_cnpj = data?.user_information?.cpf_cnpj as string
    return useAppQuery<IGeolocationAppointment[]>(
        [NAME, id_pet, cpf_cnpj],
        getPetLocation.bind(null, id_pet, cpf_cnpj),
    )
}
