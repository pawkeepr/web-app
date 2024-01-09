import DateConsults from '~/entities/DatesConsults';
import {
    getAllAppointmentsCanceled,
    updateAppointmentCanceled,
} from '~/services/helpers';
import { IAppointmentVet } from '~/store/slices/appointment-vet/types';
import useAppStore from '../../use-app-store';
import { ScheduledResponseAxios } from '../types';

const NAME = 'appointment-canceled';

type AppointmentCanceled = Pick<
    IAppointmentVet,
    'dates_consults' | 'id' | 'appointment_status'
>;

type UseAppointmentCanceledProps = {
    handleClose?: () => void;
};

export const useAppointmentCanceled = (
    props: UseAppointmentCanceledProps = {},
) => {
    const superKeys = [NAME];

    return useAppStore<ScheduledResponseAxios, AppointmentCanceled>({
        update: updateAppointmentCanceled as any,
        entity: DateConsults as any,
        handleCloseModal: props.handleClose,
        get: getAllAppointmentsCanceled,
        keys: superKeys,
        name: NAME,
    });
};

export default useAppointmentCanceled;
