import useListAppointments from '~/store/hooks/list-appointments'
import CardScheduled from '../organisms/card-scheduled'

const StepCanceled = () => {
    const { activeData, isLoading } = useListAppointments({ mode: 'canceled' })

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-10 w-full">
            {activeData?.map((appointment) => (
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
