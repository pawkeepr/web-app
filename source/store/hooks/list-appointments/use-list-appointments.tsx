import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { Appointments } from '~/entities/Appointments'
import type { BuilderEntity } from '~/entities/BuilderEntity'
import DateConsults from '~/entities/DatesConsults'
import {
    type IDateConsult,
    createScheduledVet,
    finishedAppointmentVet,
    getAllAppointmentsCanceled,
    getAllAppointmentsConfirmed,
    getAllAppointmentsDone,
    getAllAppointmentsRescheduled,
    getAllAppointmentsScheduled,
    updateAppointmentCanceled,
    updateAppointmentConfirmed,
    updateAppointmentRescheduled,
} from '~/services/helpers'
import { handleSubmitHelper } from '~/store/helpers/handle-submit-helper'
import { createErrorToast, successToast } from '~/store/helpers/toast'
import type { VeterinaryConsultation } from '~/types/appointment'
import { NAME } from '../appointment-id'
import useAppStore, { type FAxiosPost, type FAxiosUpdate } from '../use-app-store'

type AppointmentStrategy =
    | 'scheduled'
    | 'canceled'
    | 'done'
    | 'rescheduled'
    | 'confirmed'

type FGetAxios<T = unknown, G = unknown> = () => Promise<AxiosResponse<T, G>>

const nameStrategy = new Map<AppointmentStrategy, string>([
    ['scheduled', 'appointment-scheduled'],
    ['canceled', 'appointment-canceled'],
    ['done', 'appointment-done'],
    ['rescheduled', 'appointment-rescheduled'],
    ['confirmed', 'appointment-confirmed'],
] as const)

const getStrategy = new Map<AppointmentStrategy, FGetAxios>([
    ['scheduled', getAllAppointmentsScheduled],
    ['canceled', getAllAppointmentsCanceled],
    ['done', getAllAppointmentsDone],
    ['rescheduled', getAllAppointmentsRescheduled],
    ['confirmed', getAllAppointmentsConfirmed],
] as const)

const updateStrategy = new Map<
    AppointmentStrategy,
    FAxiosUpdate<IDateConsult | VeterinaryConsultation>
>([
    ['scheduled', finishedAppointmentVet as FAxiosUpdate<VeterinaryConsultation>],
    ['canceled', updateAppointmentCanceled as FAxiosUpdate<IDateConsult>],
    ['done', finishedAppointmentVet as FAxiosUpdate<IDateConsult>],
    ['rescheduled', updateAppointmentRescheduled as FAxiosUpdate<IDateConsult>],
    ['confirmed', updateAppointmentConfirmed as FAxiosUpdate<IDateConsult>],
] as const)

const createStrategy = new Map<
    AppointmentStrategy,
    FAxiosPost<VeterinaryConsultation>
>([
    ['scheduled', createScheduledVet],
    ['canceled', createScheduledVet],
    ['done', createScheduledVet],
    ['rescheduled', createScheduledVet],
    ['confirmed', createScheduledVet],
] as const)

const entityStrategy = new Map<AppointmentStrategy, BuilderEntity>([
    ['scheduled', Appointments],
    ['canceled', DateConsults],
    ['done', DateConsults],
    ['rescheduled', DateConsults],
    ['confirmed', DateConsults],
] as const)

type UseAppointmentProps = {
    mode: AppointmentStrategy
    handleClose?: () => void
}

export const useListAppointmentsByPet = ({
    mode,
    handleClose: handleCloseModal,
}: UseAppointmentProps) => {
    if (!mode) throw new Error('Mode is required')

    const keys = [NAME, nameStrategy.get(mode) as string]
    const get = getStrategy.get(mode) as FGetAxios<VeterinaryConsultation[]>
    const update = updateStrategy.get(mode) as FAxiosUpdate<IDateConsult>
    const add = createStrategy.get(mode) as unknown as FAxiosPost<IDateConsult>
    const entity = entityStrategy.get(mode)

    return useAppStore<
        VeterinaryConsultation[],
        IDateConsult | VeterinaryConsultation
    >({
        add,
        get,
        update,
        handleCloseModal,
        entity,
        keys,
        name: NAME,
        initialData: [],
    })
}

export const useCreateAppointmentMutation = ({
    mode,
}: Pick<UseAppointmentProps, 'mode'>) => {
    const queryClient = useQueryClient()

    const keys = [NAME, nameStrategy.get(mode) as string]
    const add = createStrategy.get(mode) as unknown as FAxiosPost<IDateConsult>

    return useMutation({
        mutationFn: async (data: VeterinaryConsultation) => add(data),
        onSuccess: () => successToast('Consulta agendada com sucesso!'),
        onError: createErrorToast,
        onSettled: () => queryClient.invalidateQueries(keys),
    })
}

export const useUpdateAppointmentMutation = ({
    mode,
}: Pick<UseAppointmentProps, 'mode'>) => {
    const keys = [NAME, nameStrategy.get(mode) as string]
    const update = updateStrategy.get(mode) as FAxiosUpdate<IDateConsult>

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: VeterinaryConsultation) =>
            update(data?.id as string, data),
        onSuccess: () => successToast('Reagendamento realizado com sucesso!'),
        onError: createErrorToast,
        onSettled: () => queryClient.invalidateQueries(keys),
    })
}

export const handleSubmitTypeAppointments = ({
    mode,
    handleClose,
}: UseAppointmentProps) => {
    if (!mode) throw new Error('Mode is required')

    const entity = entityStrategy.get(mode)
    const createdMutation = useCreateAppointmentMutation({ mode })
    const updatedMutation = useUpdateAppointmentMutation({ mode })

    return (data: VeterinaryConsultation) => {
        return handleSubmitHelper({
            createMutation: createdMutation,
            updateMutation: updatedMutation,
            data,
            entity,
            onSubmit: handleClose,
        })
    }
}

export default useListAppointmentsByPet
