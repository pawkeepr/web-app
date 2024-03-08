import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import useAppQuery from '~/hooks/use-app-query'
import { getCurrentUser, type CurrentUserCognito } from '~/services/helpers/auth'
import { getAllMedicalRecordsByPet } from '~/services/helpers/medical-records'
import { updateErrorToast, updateSuccessToast } from '~/store/helpers/toast'
import type { MEDICAL_RECORDS, PetMedicalRecords } from '~/types/medical-records'
import useProfile from '../profile/use-profile'
import { StrategiesMedicalRecords } from './strategies-medical-records'

type UseHookMedicalRecords = {
    name?: MEDICAL_RECORDS
    cpf_cnpj: string
    id_pet: string
}

const NAME = 'medical-records'

const TYPE_USER = {
    '1': 'vet',
    '2': 'tutor',
} as const

export const useUpdateMedicalRecordsMutation = ({
    name,
    cpf_cnpj,
    id_pet,
}: Required<UseHookMedicalRecords>) => {
    if (!cpf_cnpj || !id_pet) {
        throw new Error('cpf_cnpj and id_pet are required')
    }

    const [user, setUser] = useState<CurrentUserCognito | null>(null)

    useEffect(() => {
        getCurrentUser().then((res) => {
            setUser(res)
        })
    }, [])

    const queryClient = useQueryClient()

    const update = StrategiesMedicalRecords.get(name)

    return useMutation({
        mutationFn: async ({
            data,
        }: {
            data: Partial<unknown>
        }) => {
            const type =
                (user?.attributes[
                    'custom:type_profile'
                ] as keyof typeof TYPE_USER) || '1'
            const res = await update?.(data, cpf_cnpj, id_pet, TYPE_USER[type])
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
    return useAppQuery<PetMedicalRecords>(
        [NAME, data?.id, id_pet, cpf_cnpj],
        getAllMedicalRecordsByPet.bind(null, cpf_cnpj, id_pet),
    )
}
