
import { getAllAppointmentsScheduled } from '~/services/helpers'
import useAppStore from '../../use-app-store'
import { ScheduledResponseAxios } from '../types'

const NAME = 'appointment-scheduled'

export const useAppointmentScheduled = (
) => {
    const superKeys = [NAME]

    return useAppStore<ScheduledResponseAxios>({
        get: getAllAppointmentsScheduled.bind(null),
        keys: superKeys,
        name: NAME,
    })
}

export default useAppointmentScheduled