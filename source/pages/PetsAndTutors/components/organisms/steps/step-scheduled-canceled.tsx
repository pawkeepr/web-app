import { useAppointmentCanceled } from '~/store/hooks/list-appointments'
import CardScheduled from '../organisms/card-scheduled'

const StepCanceled = () => {
    const { activeData, isLoading } = useAppointmentCanceled()

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-10 w-full">
            {activeData?.scheduled?.map((appointment) => (
                <CardScheduled
                    key={appointment.id}
                    appointment={appointment}
                    boxButtons={null}
                />
            ))}
        </div>
    )
}

export default StepCanceled