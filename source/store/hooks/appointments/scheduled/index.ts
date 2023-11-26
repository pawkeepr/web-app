
import { createScheduledVet, getAllAppointmentsScheduled } from '~/services/helpers'
import { IAppointmentVet } from '~/store/slices/appointment-vet/types'
import useAppStore from '../../use-app-store'
import { ScheduledResponseAxios } from '../types'

const NAME = 'appointment-scheduled'

export const useAppointmentScheduled = (
) => {
    const superKeys = [NAME]

    return useAppStore<ScheduledResponseAxios, IAppointmentVet>({
        add: createScheduledVet.bind(null),
        get: getAllAppointmentsScheduled.bind(null),
        keys: superKeys,
        name: NAME,
    })
}

export default useAppointmentScheduled