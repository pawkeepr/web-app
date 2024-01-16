import { Appointments } from '~/entities/Appointments'
import {
    canceledAppointmentExternal,
    confirmedAppointmentExternal,
    getAppointmentExternalByID,
    type FnAxiosAppointmentByIdExternal,
} from '~/services/helpers'
import type { VeterinaryConsultation } from '~/types/appointment'
import useAppStore from '../use-app-store'

export const NAME = 'appointments-external'

const ModeExternal = {
    CONFIRMED: 'confirmed',
    CANCELED: 'canceled',
} as const

type ModeExternal = (typeof ModeExternal)[keyof typeof ModeExternal]

type IHookUseAppointmentExternal = {
    id?: string
    mode: ModeExternal
}

const strategyModeExternal = new Map<ModeExternal, FnAxiosAppointmentByIdExternal>([
    [ModeExternal.CONFIRMED, confirmedAppointmentExternal],
    [ModeExternal.CANCELED, canceledAppointmentExternal],
])

const useAppointmentExternal = ({ id, mode }: IHookUseAppointmentExternal) => {
    const superKeys = [NAME]

    if (!mode) {
        throw new Error('Mode is required')
    }

    const update = strategyModeExternal.get(mode as ModeExternal)

    return useAppStore<VeterinaryConsultation, VeterinaryConsultation>({
        keys: superKeys,
        name: NAME,
        get: getAppointmentExternalByID.bind(null, id as string),
        entity: Appointments,
        update,
    })
}

export default useAppointmentExternal
