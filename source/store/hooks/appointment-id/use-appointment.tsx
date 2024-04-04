import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Appointments } from '~/entities/Appointments'
import {
    createAppointmentVet,
    finishedAppointmentVet,
    getAppointmentVet,
} from '~/services/helpers'
import { handleSubmitHelper } from '~/store/helpers/handle-submit-helper'
import { createErrorToast, successToast } from '~/store/helpers/toast'
import type { VeterinaryConsultation } from '~/types/appointment'
import useAppStore from '../use-app-store'

export const NAME = 'appointment'

type IHookUseAppointment = {
    id?: string
}

const useAppointment = ({ id }: IHookUseAppointment) => {
    const superKeys = [NAME]

    return useAppStore<VeterinaryConsultation, VeterinaryConsultation>({
        keys: superKeys,
        name: NAME,
        get: getAppointmentVet.bind(null, id as string),
        entity: Appointments,
        add: createAppointmentVet,
        update: finishedAppointmentVet,
        enabled: !!id,
    })
}

export const useCreateAppointmentMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: VeterinaryConsultation) =>
            createAppointmentVet(data),
        onSuccess: () => successToast('Consulta realizada com sucesso!'),
        onError: createErrorToast,
        onSettled: () => queryClient.invalidateQueries([NAME]),
    })
}

export const useUpdateAppointmentMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: VeterinaryConsultation) =>
            finishedAppointmentVet(data?.id as string, data),
        onSuccess: () => successToast('Consulta realizada com sucesso!'),
        onError: createErrorToast,
        onSettled: () => queryClient.invalidateQueries([NAME]),
    })
}

export const handleSubmitAppointments = (finallySubmit?: () => unknown) => {
    const createdMutation = useCreateAppointmentMutation()
    const updatedMutation = useUpdateAppointmentMutation()

    return (data: VeterinaryConsultation) => {
        return handleSubmitHelper({
            createMutation: createdMutation,
            updateMutation: updatedMutation,
            data,
            entity: Appointments,
            onSubmit: finallySubmit,
        })
    }
}

export default useAppointment
