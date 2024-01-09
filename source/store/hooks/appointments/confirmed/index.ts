import { getAllAppointmentsConfirmed } from '~/services/helpers';
import useAppStore from '../../use-app-store';
import { ScheduledResponseAxios } from '../types';

const NAME = 'appointment-confirmed';

type UseAppointmentConfirmedProps = {
    handleClose?: () => void;
};

export const useAppointmentConfirmed = (
    props: UseAppointmentConfirmedProps = {},
) => {
    const superKeys = [NAME];

    return useAppStore<ScheduledResponseAxios>({
        get: getAllAppointmentsConfirmed.bind(null),
        handleCloseModal: props.handleClose,
        keys: superKeys,
        name: NAME,
    });
};

export default useAppointmentConfirmed;
