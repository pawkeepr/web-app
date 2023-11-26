import {
    IAppointmentVet,
    IDatesConsultsAppointment
} from "~/store/slices/appointment-vet/types";


type DateConsultsProps = Pick<IAppointmentVet, 'dates_consults'>;

class DateConsults implements DateConsultsProps {

    readonly dates_consults: IDatesConsultsAppointment;

    private constructor(

    ) {
        this.dates_consults = {
            additional_remarks: '',
            date_consultation: '',
            date_next_consultation: '',
            reason_consultation: '',
            time_consultation: '',
            time_next_consultation: '',
            type_consultation: '',
        }
    }

    defineAdditionalRemarks(
        additional_remarks: string = ''
    ): this {
        this.dates_consults.additional_remarks = additional_remarks;
        return this;
    }

    static build(props: DateConsultsProps): DateConsults {
        const entity = new DateConsults();

        return entity
            .defineAdditionalRemarks(props.dates_consults.additional_remarks)
    }
}

export default DateConsults;