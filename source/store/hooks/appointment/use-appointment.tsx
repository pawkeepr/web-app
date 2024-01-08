import {
    createAppointmentVet,
    finishedAppointmentVet,
} from '~/services/helpers';
import { VeterinaryConsultation } from '~/types/appointment';
import useAppStore from '../use-app-store';

export const NAME = 'appointments-vet';

const useAppointment = () => {
    const superKeys = [NAME];

    return useAppStore<VeterinaryConsultation>({
        keys: superKeys,
        name: NAME,
        add: createAppointmentVet,
        update: finishedAppointmentVet,
    });
};

export default useAppointment;
