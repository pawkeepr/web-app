import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAppQuery from '~/hooks/use-app-query'
import { getAllMedicalRecordsByPet } from '~/services/helpers/medical-records'
import { updateErrorToast, updateSuccessToast } from '~/store/helpers/toast'
import type { MEDICAL_RECORDS } from '~/types/medical-records'
import useProfile from '../profile/use-profile'
import { StrategiesMedicalRecords } from './strategies-medical-records'

type UseHookMedicalRecords = {
    name?: MEDICAL_RECORDS
    cpf_cnpj: string
    id_pet: string
}

const NAME = 'medical-records'

export const useUpdateMedicalRecordsMutation = ({
    name,
    cpf_cnpj,
    id_pet,
}: Required<UseHookMedicalRecords>) => {
    const queryClient = useQueryClient()

    const update = StrategiesMedicalRecords.get(name)

    return useMutation({
        mutationFn: async ({
            data,
        }: {
            data: Partial<unknown>
        }) => {
            const res = await update?.(data, cpf_cnpj, id_pet)
            return res?.data
        },
        onSuccess: updateSuccessToast,
        onError: () => updateErrorToast,
        onSettled: async () => {
            await queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey.includes(NAME)
                },
            })
        },
    })
}

export const useGetMedicalRecordsByPet = ({
    id_pet,
    cpf_cnpj,
}: UseHookMedicalRecords) => {
    const { data } = useProfile()
    return useAppQuery<unknown[]>([NAME, data?.id, id_pet], async () => {
        const res = await getAllMedicalRecordsByPet(cpf_cnpj, id_pet)
        return res?.data
    })
}
