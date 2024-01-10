import { getAllAppointmentsDone } from '~/services/helpers'
import { VeterinaryConsultation } from '~/types/appointment'
import useAppStore from '../../use-app-store'

const NAME = 'appointment-done'

export const useAppointmentDone = () => {
    const superKeys = [NAME]

    return useAppStore<VeterinaryConsultation>({
        get: getAllAppointmentsDone.bind(null),
        keys: superKeys,
        name: NAME,
    })
}

export default useAppointmentDone
