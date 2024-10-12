import { useEffect, useState } from 'react'
import useAppQuery from '~/hooks/use-app-query'
import useMutationHelper from '~/hooks/use-mutation-helper'
import { getCurrentUser, type CurrentUserCognito } from '~/services/helpers/auth'
import { getAllMedicalRecordsByPet } from '~/services/helpers/medical-records'
import { handleSubmitHelper } from '~/store/helpers/handle-submit-helper'
import type {
    MEDICAL_RECORDS,
    MedicalRecordEntry,
    PetMedicalRecords,
} from '~/types/medical-records'
import useProfile from '../profile/use-profile'
import {
    StrategiesMedicalRecords,
    type FAxiosInsert,
    type FAxiosUpdate,
} from './strategies-medical-records'

const NAME = 'medical-records'

const TYPE_USER = {
    '1': 'vet',
    '2': 'tutor',
} as const

type UseHookMedicalRecords = {
    name?: MEDICAL_RECORDS
    cpf_cnpj: string
    id_pet: string
}

type UseHookMutationsHelpers = {
    type_user: (typeof TYPE_USER)[keyof typeof TYPE_USER]
    onAxiosRequest: FAxiosInsert<unknown> | FAxiosUpdate<unknown>
}

export const useCreateMedicalRecordsMutation = ({
    name,
    cpf_cnpj,
    id_pet,
    onAxiosRequest,
    type_user,
}: Required<UseHookMedicalRecords> & UseHookMutationsHelpers) => {
    const keys = [name, cpf_cnpj, id_pet, type_user]

    return useMutationHelper({
        mutationKey: keys,
        mutationFn: async (data: MedicalRecordEntry) =>
            onAxiosRequest(data, cpf_cnpj, id_pet, type_user as any),
    })
}

export const useUpdateMedicalRecordsMutation = ({
    name,
    cpf_cnpj,
    id_pet,
    onAxiosRequest,
    type_user,
}: Required<UseHookMedicalRecords> & UseHookMutationsHelpers) => {
    const keys = [name, cpf_cnpj, id_pet, type_user]

    return useMutationHelper({
        mutationKey: keys,
        mutationFn: async (data) =>
            onAxiosRequest(data, cpf_cnpj, id_pet, type_user as any),
    })
}

export const useHandleMedicalRecordsMutation = ({
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

    const strategy = StrategiesMedicalRecords.get(name)

    if (!strategy) {
        throw new Error('Strategy not found')
    }

    const [update, insert] = strategy
    const type_user =
        TYPE_USER[
            user?.attributes['custom:type_profile'] as keyof typeof TYPE_USER
        ] || TYPE_USER[1]

    const createdMutation = useCreateMedicalRecordsMutation({
        cpf_cnpj,
        id_pet,
        name,
        type_user,
        onAxiosRequest: insert,
    })

    const updatedMutation = useUpdateMedicalRecordsMutation({
        cpf_cnpj,
        id_pet,
        name,
        type_user,
        onAxiosRequest: update,
    })

    return (data: MedicalRecordEntry) => {
        return handleSubmitHelper({
            createMutation: createdMutation,
            updateMutation: updatedMutation,
            data,
        })
    }
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

export const useDeleteMedicalRecords = ({
    name,
    cpf_cnpj,
    id_pet,
    id_object,
}: Required<UseHookMedicalRecords> & { id_object: string }) => {
    if (!cpf_cnpj || !id_pet || !name) {
        throw new Error('cpf_cnpj, id_pet e name are required')
    }

    const [user, setUser] = useState<CurrentUserCognito | null>(null)

    useEffect(() => {
        getCurrentUser().then((res) => {
            setUser(res)
        })
    }, [])

    const strategy = StrategiesMedicalRecords.get(name)

    if (!strategy) {
        throw new Error('Strategy not found')
    }

    const [, , del] = strategy
    const type_user =
        TYPE_USER[
            user?.attributes['custom:type_profile'] as keyof typeof TYPE_USER
        ] || TYPE_USER[1]

    return useMutationHelper({
        mutationKey: [NAME, id_pet, type_user],
        mutationFn: async () => del(id_object, cpf_cnpj, id_pet, type_user),
    })
}
