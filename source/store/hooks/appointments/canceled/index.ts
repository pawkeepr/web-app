
import { getAllAppointmentsCanceled } from '~/services/helpers'
import { IAppointmentVet } from '~/store/slices/appointment-vet/types'
import useAppStore from '../../use-app-store'

const NAME = 'appointment-canceled'

export const useAppointmentCanceled = (
) => {
    const superKeys = [NAME]

    return useAppStore<IAppointmentVet>({
        get: getAllAppointmentsCanceled.bind(null),
        keys: superKeys,
        name: NAME,
    })
}

export default useAppointmentCanceled