import type { VeterinaryConsultation } from '~/types/appointment'

type DateConsultsProps = Pick<VeterinaryConsultation, 'dates_consults' | 'id'>

class DateConsults implements DateConsultsProps {
    id: string | null
    dates_consults: VeterinaryConsultation['dates_consults']

    private constructor() {
        this.id = null
        this.dates_consults = {
            additional_remarks: '',
            date_consultation: '',
            reason_consultation: '',
            time_consultation: '',
            type_consultation: '',
        }
    }

    defineId(id: string): this {
        this.id = id
        return this
    }

    defineDateConsultas(
        date_consultation: VeterinaryConsultation['dates_consults'],
    ): this {
        this.dates_consults = date_consultation
        return this
    }

    static build(props: DateConsultsProps): DateConsults {
        const entity = new DateConsults()

        return entity
            .defineId(props.id as string)
            .defineDateConsultas(props.dates_consults)
    }
}

export default DateConsults
