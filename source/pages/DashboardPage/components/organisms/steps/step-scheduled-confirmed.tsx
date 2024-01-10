import { useAppointmentConfirmed } from '~/store/hooks/appointments'
import CardScheduled from '../organisms/card-scheduled'

const StepConfirmed = () => {
    const { activeData, isLoading } = useAppointmentConfirmed()

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-10 w-full">
            {activeData?.scheduled?.map((appointment) => (
                <CardScheduled key={appointment.id} appointment={appointment} />
            ))}
        </div>
    )
}

export default StepConfirmed
