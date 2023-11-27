import { Appointments } from '~/entities/Appointments'
import { createAppointmentVet, finishedAppointmentVet } from '~/services/helpers'
import useAppStore from '../use-app-store'

export const NAME = 'appointments-vet'

const useAppointment = (
) => {
    const superKeys = [NAME]

    return useAppStore<Appointments>({
        keys: superKeys,
        name: NAME,
        add: createAppointmentVet,
        update: finishedAppointmentVet,
    })
}

export default useAppointment