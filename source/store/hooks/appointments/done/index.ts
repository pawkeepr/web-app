import { getAllAppointmentsDone } from '~/services/helpers'
import useAppStore from '../../use-app-store'
import { ScheduledResponseAxios } from '../types'

const NAME = 'appointment-done'

export const useAppointmentDone = () => {
    const superKeys = [NAME]

    return useAppStore<ScheduledResponseAxios>({
        get: getAllAppointmentsDone.bind(null),
        keys: superKeys,
        name: NAME,
    })
}

export default useAppointmentDone
