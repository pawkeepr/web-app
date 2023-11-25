
import { getAllAppointmentsConfirmed } from '~/services/helpers'
import { IAppointmentVet } from '~/store/slices/appointment-vet/types'
import useAppStore from '../../use-app-store'

const NAME = 'appointment-confirmed'

export const useAppointmentConfirmed = (
) => {
    const superKeys = [NAME]

    return useAppStore<IAppointmentVet>({
        get: getAllAppointmentsConfirmed.bind(null),
        keys: superKeys,
        name: NAME,
    })
}

export default useAppointmentConfirmed