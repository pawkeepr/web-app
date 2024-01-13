import CardScheduled from '~/Components/organism/card-scheduled/card-scheduled'
import useListAppointments from '~/store/hooks/list-appointments'

const StepDone = () => {
    const { activeData, isLoading } = useListAppointments({ mode: 'done' })

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-10 w-full">
            {activeData?.map((appointment) => (
                <CardScheduled key={appointment.id} appointment={appointment} />
            ))}
        </div>
    )
}

export default StepDone
