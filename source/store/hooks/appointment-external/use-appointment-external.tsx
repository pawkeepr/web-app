import { Appointments } from '~/entities/Appointments'
import {
    createAppointmentVet,
    finishedAppointmentVet,
    getAppointmentVet,
} from '~/services/helpers'
import type { VeterinaryConsultation } from '~/types/appointment'
import useAppStore from '../use-app-store'

export const NAME = 'appointments-vet'

type IHookUseAppointmentExternal = {
    id?: string
}

const useAppointmentExternal = ({ id }: IHookUseAppointmentExternal) => {
    const superKeys = [NAME]

    return useAppStore<VeterinaryConsultation, VeterinaryConsultation>({
        keys: superKeys,
        name: NAME,
        get: getAppointmentVet.bind(null, id as string),
        entity: Appointments,
        add: createAppointmentVet,
        update: finishedAppointmentVet,
    })
}

export default useAppointmentExternal
