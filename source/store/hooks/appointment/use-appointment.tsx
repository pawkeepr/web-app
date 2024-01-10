import { Appointments } from '~/entities/Appointments'
import { createAppointmentVet, finishedAppointmentVet } from '~/services/helpers'
import type { VeterinaryConsultation } from '~/types/appointment'
import useAppStore from '../use-app-store'

export const NAME = 'appointments-vet'

const useAppointment = () => {
    const superKeys = [NAME]

    return useAppStore<VeterinaryConsultation>({
        keys: superKeys,
        name: NAME,
        entity: Appointments,
        add: createAppointmentVet,
        update: finishedAppointmentVet,
    })
}

export default useAppointment
