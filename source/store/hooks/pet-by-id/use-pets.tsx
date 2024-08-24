import { Pet } from '~/entities/Pet'
import useAppQuery from '~/hooks/use-app-query'
import useMutationHelper from '~/hooks/use-mutation-helper'
import { createPet, createPetByTutor, getPet, updatePet } from '~/services/helpers'
import {
    fetchPublicMedicalRecords,
    fetchPublicPet,
    fetchPublicPetVerify,
} from '~/services/helpers/pet'
import { handleSubmitHelper } from '~/store/helpers/handle-submit-helper'
import type { PetMedicalRecords } from '~/types/medical-records'
import type { IPet } from '~/types/pet'
import type { IMainResponsibleGuardian, IPetV2, PetData } from '~/types/pet-v2'
import { TypeProfile } from '~/types/profile'
import useProfile from '../profile/use-profile'
import useAppStore from '../use-app-store'

export const NAME = 'pet'

export const usePetByIdV2 = (document: string, id_pet: string) => {
    const superKeys = [NAME, document, id_pet]

    return useAppQuery<IPetV2>(superKeys, () => getPet(document, id_pet), {
        enabled: !!document && !!id_pet,
    })
}

const usePetById = (document: string, id_pet: string) => {
    const superKeys = [NAME, document, id_pet]

    const { data: profile } = useProfile()

    const create =
        profile?.type_profile === TypeProfile.TUTOR ? createPetByTutor : createPet

    return useAppStore<IPetV2>({
        get: getPet.bind(null, document, id_pet),
        entity: Pet,
        keys: superKeys,
        add: create,
        name: NAME,
        enabled: !!document,
        update: updatePet.bind(null, document),
    })
}

export const useCreateAppointmentMutation = (document: string, pet_id: string) => {
    const { data: profile } = useProfile()

    const create =
        profile?.type_profile === TypeProfile.TUTOR ? createPetByTutor : createPet

    return useMutationHelper({
        mutationKey: [NAME, document, pet_id],
        mutationFn: async (data: IPetV2) => create(data),
    })
}

export const useUpdateAppointmentMutation = (document: string, pet_id: string) => {
    return useMutationHelper({
        mutationKey: [NAME, document, pet_id],
        mutationFn: async (data: IPetV2) =>
            updatePet.bind(null, document, data.id as string, data),
    })
}

export const handleSubmitAppointments = ({
    document,
    finallySubmit,
    pet_id,
}: {
    document: string
    finallySubmit?: () => unknown
    pet_id: string
}) => {
    const createdMutation = useCreateAppointmentMutation(document, pet_id)
    const updatedMutation = useUpdateAppointmentMutation(document, pet_id)

    return (data: IPet) => {
        return handleSubmitHelper({
            createMutation: createdMutation,
            updateMutation: updatedMutation,
            data,
            entity: Pet,
            onSubmit: finallySubmit,
        })
    }
}

export const usePetPublic = (id_pet: string) => {
    const superKeys = [NAME, id_pet, 'public']

    return useAppQuery<IPetV2>(superKeys, () => fetchPublicPet(id_pet), {
        enabled: !!id_pet,
    })
}

export const usePetVerifyPublic = (id_pet: string) => {
    const superKeys = [NAME, id_pet, 'verify']

    return useAppQuery<IPetV2>(superKeys, () => fetchPublicPetVerify(id_pet), {
        enabled: !!id_pet,
    })
}

type GetterPetMedicalRecords = PetMedicalRecords & {
    pet_information: PetData
    main_responsible_guardian: IMainResponsibleGuardian
}

export const useMedicalRecordsPublic = (id_pet: string) => {
    const superKeys = ['medical-records', id_pet, 'public']

    return useAppQuery<GetterPetMedicalRecords>(
        superKeys,
        () => fetchPublicMedicalRecords(id_pet),
        {
            enabled: !!id_pet,
        },
    )
}

export default usePetById
