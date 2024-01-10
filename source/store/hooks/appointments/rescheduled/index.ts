import DateConsults from '~/entities/DatesConsults'
import {
    getAllAppointmentsRescheduled,
    updateAppointmentRescheduled,
} from '~/services/helpers'
import { IAppointmentVet } from '~/store/slices/appointment-vet/types'
import useAppStore from '../../use-app-store'
import { ScheduledResponseAxios } from '../types'

const NAME = 'appointment-rescheduled'

type UseAppointmentCanceledProps = {
    handleClose?: () => void
}
export const useAppointmentRescheduled = (
    props: UseAppointmentCanceledProps = {},
) => {
    const superKeys = [NAME]

    return useAppStore<ScheduledResponseAxios, IAppointmentVet>({
        get: getAllAppointmentsRescheduled,
        update: updateAppointmentRescheduled,
        entity: DateConsults,
        handleCloseModal: props.handleClose,
        keys: superKeys,
        name: NAME,
    })
}

export default useAppointmentRescheduled
