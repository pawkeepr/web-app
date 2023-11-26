
import { getAllAppointmentsConfirmed } from '~/services/helpers'
import useAppStore from '../../use-app-store'
import { ScheduledResponseAxios } from '../types'

const NAME = 'appointment-confirmed'

export const useAppointmentConfirmed = (
) => {
    const superKeys = [NAME]

    return useAppStore<ScheduledResponseAxios>({
        get: getAllAppointmentsConfirmed.bind(null),
        keys: superKeys,
        name: NAME,
    })
}

export default useAppointmentConfirmed