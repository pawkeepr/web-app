import CardScheduled from '~/Components/organism/card-scheduled/card-scheduled'
import useGetAllAppointments from './hook'

const StepCanceled = () => {
    const { filteredCanceledData, isLoading } = useGetAllAppointments()

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-10 w-full">
            {filteredCanceledData?.map((appointment) => (
                <CardScheduled key={appointment.id} appointment={appointment} />
            ))}
        </div>
    )
}

export default StepCanceled
