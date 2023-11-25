
import { getAllAppointmentsDone } from '~/services/helpers'
import { IAppointmentVet } from '~/store/slices/appointment-vet/types'
import useAppStore from '../../use-app-store'

const NAME = 'appointment-done'

export const useAppointmentDone = (
) => {
    const superKeys = [NAME]

    return useAppStore<IAppointmentVet>({
        get: getAllAppointmentsDone.bind(null),
        keys: superKeys,
        name: NAME,
    })
}

export default useAppointmentDone