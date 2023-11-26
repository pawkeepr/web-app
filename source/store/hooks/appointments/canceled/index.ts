
import { getAllAppointmentsCanceled } from '~/services/helpers'
import useAppStore from '../../use-app-store'
import { ScheduledResponseAxios } from '../types'

const NAME = 'appointment-canceled'

export const useAppointmentCanceled = (
) => {
    const superKeys = [NAME]

    return useAppStore<ScheduledResponseAxios>({
        get: getAllAppointmentsCanceled.bind(null),
        keys: superKeys,
        name: NAME,
    })
}

export default useAppointmentCanceled