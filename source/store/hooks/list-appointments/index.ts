import type { AxiosResponse } from 'axios'
import { Appointments } from '~/entities/Appointments'
import type { BuilderEntity } from '~/entities/BuilderEntity'
import DateConsults from '~/entities/DatesConsults'
import {
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
    type IDateConsult,
} from '~/services/helpers'
import type { VeterinaryConsultation } from '~/types/appointment'
import useAppStore, { type FAxiosPost, type FAxiosUpdate } from '../use-app-store'

const NAME = 'appointment-scheduled'

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

export const useListAppointments = ({ mode, handleClose }: UseAppointmentProps) => {
    if (!mode) throw new Error('Mode is required')

    const superKeys = [nameStrategy.get(mode) as string]
    const get = getStrategy.get(mode) as FGetAxios<VeterinaryConsultation[]>
    const update = updateStrategy.get(mode) as FAxiosUpdate<
        VeterinaryConsultation,
        IDateConsult
    >
    const add = createStrategy.get(mode) as unknown as FAxiosPost<
        VeterinaryConsultation,
        IDateConsult
    >
    const entity = entityStrategy.get(mode)

    return useAppStore<VeterinaryConsultation, IDateConsult>({
        add,
        get,
        update,
        handleCloseModal: handleClose,
        entity,
        keys: superKeys,
        name: NAME,
    })
}

export default useListAppointments
