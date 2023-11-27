import { Appointments } from '~/entities/Appointments'
import { createAppointmentVet } from '~/services/helpers'
import useAppStore from '../use-app-store'

export const NAME = 'appointments-vet'

const useAppointment = (
) => {
    const superKeys = [NAME]

    return useAppStore<Appointments>({
        keys: superKeys,
        name: NAME,
        add: createAppointmentVet,
    })
}

export default useAppointment