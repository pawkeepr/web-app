import {
    IAppointmentVet,
    IDatesConsultsAppointment,
    IStatusAppointment
} from "~/store/slices/appointment-vet/types";


type DateConsultsProps = Pick<IAppointmentVet, 'dates_consults' | 'id' | 'appointment_status'>;

class DateConsults implements DateConsultsProps {

    id: string | null;
    appointment_status: IStatusAppointment;
    dates_consults: IDatesConsultsAppointment;

    private constructor(

    ) {
        this.id = null;
        this.dates_consults = {
            additional_remarks: '',
            date_consultation: '',
            date_next_consultation: '',
            reason_consultation: '',
            time_consultation: '',
            time_next_consultation: '',
            type_consultation: '',
        }

        this.appointment_status = {
            canceled: 'no',
            confirmed: 'no',
            done: 'no',
            reason_canceled: 'no',
            scheduled: 'yes',
        } as IStatusAppointment;
    }

    defineId(id: string): this {
        this.id = id;
        return this;
    }

    defineDateConsultas(
        date_consultation: IDatesConsultsAppointment
    ): this {
        this.dates_consults = date_consultation;
        return this;
    }

    defineAppointmentStatus(appointment_status: IStatusAppointment): this {
        if (!appointment_status) return this
        this.appointment_status = appointment_status;
        return this;
    }



    static build(props: DateConsultsProps): DateConsults {
        const entity = new DateConsults();

        return entity
            .defineId(props.id as string)
            .defineDateConsultas(props.dates_consults)
            .defineAppointmentStatus(props.appointment_status)
    }
}

export default DateConsults;