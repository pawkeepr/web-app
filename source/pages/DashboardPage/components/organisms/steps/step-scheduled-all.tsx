import useListAppointments from '~/store/hooks/list-appointments'
import CardScheduled from '../organisms/card-scheduled'

const StepAll = () => {
    const { activeData, isLoading } = useListAppointments({ mode: 'scheduled' })

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-10 w-full">
            {activeData?.map((appointment) => (
                <CardScheduled key={appointment.id} appointment={appointment} />
            ))}
        </div>
    )
}

export default StepAll
