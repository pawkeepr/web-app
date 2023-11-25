
import { getAllAppointmentsScheduled } from '~/services/helpers'
import { IAppointmentVet } from '~/store/slices/appointment-vet/types'
import useAppStore from '../../use-app-store'

const NAME = 'appointment-scheduled'

export const useAppointmentScheduled = (
) => {
    const superKeys = [NAME]

    return useAppStore<IAppointmentVet>({
        get: getAllAppointmentsScheduled.bind(null),
        keys: superKeys,
        name: NAME,
    })
}

export default useAppointmentScheduled